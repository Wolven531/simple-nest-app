import { HttpService } from '@nestjs/axios'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import {
	COMMON_QUEUE_TYPES,
	MAX_NUM_MATCHES,
	MIN_NUM_MATCHES,
	REGION_V5,
} from '../constants'
import { Game } from '../models/game.model'
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
	 * This method uses the Riot Match API v5 to retrieve a Game
	 *
	 * @param gameId string Identifier for game to retrieve
	 * @returns Promise<Game> if successful; Promise<null> otherwise
	 */
	async v5GetGame(gameId: string): Promise<Game | null> {
		const apiKey = this.appService.getRiotToken()

		this.logger.log(
			`About to fetch game (id = ${gameId})`,
			' getGame | match-svc ',
		)

		return firstValueFrom(
			this.httpService.get(
				`https://${REGION_V5}.api.riotgames.com/lol/match/v5/matches/${gameId}`,
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
			.then<Game>((resp) => {
				const game = resp.data.info as Game

				return game
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
	 * This method uses the Riot Match API v5 to retrieve a list of matches for a specific Summoner
	 *
	 * @param puuid string `puuid` of a Summoner to use when retrieving matches
	 * @param getLastX number Defaults to 10; number of matches to retrieve
	 * @param queueType string Defaults to undefined; can be specified as a key from COMMON_QUEUE_TYPES
	 *     to filter which matches to request
	 * @returns A collection of Game objects
	 */
	async v5GetMatchlist(
		puuid: string,
		getLastX = 10,
		queueType: keyof typeof COMMON_QUEUE_TYPES = undefined,
	): Promise<Game[]> {
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

		this.logger.log(
			`About to use HTTP to grab list of game IDs for puuid="${puuid}"`,
			' getMatchlist | match-svc ',
		)

		return firstValueFrom(
			this.httpService.get(
				`https://${REGION_V5}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${getLastX}${filterQueue}`,
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
			.then<string[]>((resp) => {
				const matchIds = resp.data as string[]

				this.logger.log(
					`${matchIds.length} total matches`,
					' getMatchlist | match-svc ',
				)

				return matchIds
			})
			.then<Game[]>((allMatches: string[]) => {
				this.logger.log(
					`retrieving additional info for ${allMatches.length} indiviudal games...`,
					' getMatchlist | match-svc ',
				)

				return Promise.all(
					allMatches.map((matchId) => {
						this.logger.log(`about to grab game - ${matchId}`)
						return this.v5GetGame(matchId)
					}),
				)
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
