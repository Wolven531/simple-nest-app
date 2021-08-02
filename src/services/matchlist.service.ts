import { HttpService } from '@nestjs/axios'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import {
	COMMON_QUEUE_TYPES,
	MAX_NUM_MATCHES,
	MIN_NUM_MATCHES,
	REGION,
} from '../constants'
import { Game } from '../models/game.model'
import { Match } from '../models/match.model'
import { Matchlist } from '../models/matchlist.model'
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
	 * This method uses the Riot Match API v4 to retrieve a Game
	 *
	 * @param gameId number Identifier for game to retrieve
	 * @returns Promise<Game> if successful; Promise<null> otherwise
	 */
	v4GetGame(gameId: number): Promise<Game | null> {
		const apiKey = this.appService.getRiotToken()

		return firstValueFrom(
			this.httpService.get(
				`https://${REGION}.api.riotgames.com/lol/match/v4/matches/${gameId}`,
				{
					headers: {
						'Accept-Charset':
							'application/x-www-form-urlencoded; charset=UTF-8',
						'Accept-Language': 'en-US,en;q=0.9',
						'X-Riot-Token': apiKey,
					},
				},
			),
		)
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
					`Error while fetching game!\n\n${JSON.stringify(
						err,
						null,
						4,
					)}`,
					' getGame | match-svc ',
				)

				return null
			})
	}

	/**
	 * This method uses the Riot Match API v4 to retrieve a list of matches for a specific Summoner
	 *
	 * @param accountId string `accountId` of a Summoner to use when retrieving matches
	 * @param getLastX number Defaults to 10; number of matches to retrieve
	 * @param includeGameData boolean Defaults to false; retrieves individual game data if true;
	 *     otherwise, returns simple match data
	 * @param queueType string Defaults to undefined; can be specified as a key from COMMON_QUEUE_TYPES
	 *     to filter which matches to request
	 * @returns A collection of either Match objects (default) or Game objects (includeGameData=true)
	 */
	v4GetMatchlist(
		accountId: string,
		getLastX = 10,
		includeGameData = false,
		queueType: keyof typeof COMMON_QUEUE_TYPES = undefined,
	): Promise<Match[] | Game[]> {
		const apiKey = this.appService.getRiotToken()

		// update value BEFORE hitting Riot API
		if (getLastX < MIN_NUM_MATCHES) {
			getLastX = MIN_NUM_MATCHES
		}

		if (getLastX > MAX_NUM_MATCHES) {
			getLastX = MAX_NUM_MATCHES
		}

		const filterQueue =
			queueType === undefined
				? ''
				: `&queue=${COMMON_QUEUE_TYPES[queueType].id}`

		return firstValueFrom(
			this.httpService.get(
				`https://${REGION}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=${getLastX}${filterQueue}`,
				{
					headers: {
						'Accept-Charset':
							'application/x-www-form-urlencoded; charset=UTF-8',
						'Accept-Language': 'en-US,en;q=0.9',
						'X-Riot-Token': apiKey,
					},
				},
			),
		)
			.then<Match[]>((resp) => {
				const matchlist: Matchlist = resp.data

				this.logger.log(
					`${matchlist.totalGames} total matches, returning indices ${matchlist.startIndex} - ${matchlist.endIndex}`,
					' getMatchlist | match-svc ',
				)

				return matchlist.matches
			})
			.then<Match[] | Game[]>((allMatches: Match[]) => {
				const messageRetrieval = includeGameData
					? `retrieving additional info for ${allMatches.length} indiviudal games...`
					: 'returning info for matches w/o further data retrieval'

				this.logger.log(
					`includeGameData=${includeGameData}; ${messageRetrieval}`,
					' getMatchlist | match-svc ',
				)

				return includeGameData
					? Promise.all(
							allMatches.map((match) =>
								this.v4GetGame(match.gameId),
							),
							// could also be expressed (less efficiently) as below
							// more info -
							// https://www.freecodecamp.org/news/beware-of-chaining-array-methods-in-javascript-ef3983b60fbc
							// allMatches.map((match) => match.gameId).map(this.v4GetGame),
					  )
					: Promise.resolve(allMatches)
			})
			.catch((err) => {
				this.logger.error(
					`Error while fetching matches!\n\n${JSON.stringify(
						err,
						null,
						4,
					)}`,
					' getMatchlist | match-svc ',
				)

				return []
			})
	}
}
