import { Game } from '../models/game.model'
import { Match } from '../models/match.model'
import { Matchlist } from '../models/matchlist.model'
import { HttpService, Inject, Injectable, Logger } from '@nestjs/common'
import { MAX_NUM_MATCHES, MIN_NUM_MATCHES, REGION } from '../constants'
import { AppService } from './app.service'

@Injectable()
export class MatchlistService {
	constructor(
		@Inject(AppService)
		private readonly appService: AppService,
		@Inject(HttpService)
		private readonly httpService: HttpService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	/**
	 * This method retrieves a Game from the Riot API
	 *
	 * @param gameId Numeric identifier for which game to retrieve
	 *
	 * @returns Promise<Game> if successful; Promise<null> otherwise
	 */
	getGame(gameId: number): Promise<Game | null> {
		const apiKey = this.appService.getRiotToken()

		return this.httpService
			.get(
				`https://${REGION}.api.riotgames.com/lol/match/v4/matches/${gameId}`,
				{
					headers: {
						'Accept-Charset':
							'application/x-www-form-urlencoded; charset=UTF-8',
						'Accept-Language': 'en-US,en;q=0.9',
						'X-Riot-Token': apiKey,
					},
				},
			)
			.toPromise()
			.then((resp) => {
				const gameInfo: Game = resp.data

				this.logger.log(
					`Fetched game (id = ${gameId})! Created = ${gameInfo.gameCreation} Duration = ${gameInfo.gameDuration}`,
					' getGame | match-svc ',
				)

				return gameInfo
			})
			.catch((err) => {
				this.logger.error(
					`Error while fetching game!\n\n${JSON.stringify(err, null, 4)}`,
					' getGame | match-svc ',
				)

				return null
			})
	}

	getMatchlist(
		accountId: string,
		getLastX: number | undefined,
		includeGameData = false,
	): Promise<Match[] | Game[]> {
		const apiKey = this.appService.getRiotToken()

		return this.httpService
			.get(
				`https://${REGION}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`,
				{
					headers: {
						'Accept-Charset':
							'application/x-www-form-urlencoded; charset=UTF-8',
						'Accept-Language': 'en-US,en;q=0.9',
						'X-Riot-Token': apiKey,
					},
				},
			)
			.toPromise()
			.then(async (resp) => {
				const matchlist: Matchlist = resp.data

				this.logger.log(
					`${matchlist.totalGames} total matches, returning indices ${matchlist.startIndex} - ${matchlist.endIndex}`,
					' getMatchlist | match-svc ',
				)

				const allMatches: Match[] = matchlist.matches

				if (getLastX === undefined) {
					return allMatches
				}
				if (getLastX < MIN_NUM_MATCHES) {
					return []
				}
				if (getLastX > MAX_NUM_MATCHES) {
					getLastX = MAX_NUM_MATCHES
				}

				// TODO: incorporate this limit in request to Riot API
				const returnData: Match[] = allMatches.slice(0, getLastX)

				return includeGameData
					? await Promise.all(
							returnData.map(
								(match) => this.getGame(match.gameId) as Promise<Game>,
							),
					  )
					: returnData
			})
			.catch((err) => {
				this.logger.error(
					`Error while fetching matches!\n\n${JSON.stringify(err, null, 4)}`,
					' getMatchlist | match-svc ',
				)

				return []
			})
	}
}
