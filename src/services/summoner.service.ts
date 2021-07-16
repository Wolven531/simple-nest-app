import {
	HttpService,
	HttpStatus,
	Inject,
	Injectable,
	Logger,
} from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { REGION } from '../constants'
import { Summoner } from '../models/summoner.model'
import { AppService } from './app.service'

@Injectable()
export class SummonerService {
	private static readonly BASE = `https://${REGION}.api.riotgames.com`
	private static readonly ENDPOINT_GET_BY_SUMMONER_ID =
		'lol/summoner/v4/summoners'
	private static readonly ENDPOINT_SEARCH_BY_NAME =
		'lol/summoner/v4/summoners/by-name'

	constructor(
		@Inject(AppService)
		private readonly appService: AppService,
		@Inject(HttpService)
		private readonly httpService: HttpService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	/**
	 * This method uses the Riot API to search for a Summoner by name
	 *
	 * @returns Promise<Summoner | null> - information about a Summoner, if found; null otherwise
	 */
	async searchByName(searchKey: string): Promise<Summoner | null> {
		const ctx = ' Summoner-Svc | searchByName '

		try {
			this.logger.verbose('Grabbing riotToken...', ctx)

			const riotToken = this.appService.getRiotToken()

			this.logger.verbose(`riotToken="${riotToken}"`, ctx)
			this.logger.debug('About to contact Riot API...', ctx)

			const getResp: AxiosResponse<Summoner> = await this.httpService
				.get(
					`${SummonerService.BASE}/${SummonerService.ENDPOINT_SEARCH_BY_NAME}/${searchKey}`,
					{
						headers: {
							'Accept-Charset':
								'application/x-www-form-urlencoded; charset=UTF-8',
							'Accept-Language': 'en-US,en;q=0.9',
							'X-Riot-Token': riotToken,
						},
					},
				)
				.toPromise()

			if (getResp.status === HttpStatus.NOT_FOUND) {
				this.logger.debug('Summoner was not found, returning null...', ctx)
				return null
			}

			return getResp.data
		} catch (err) {
			return null
		}
	}

	/**
	 * This method uses the Riot API to get a Summoner by summonerId (just `id` for Riot)
	 *
	 * @returns Promise<Summoner | null> - information about a Summoner, if found; null otherwise
	 */
	async getSummonerById(summonerId: string): Promise<Summoner | null> {
		const ctx = ' Summoner-Svc | getSummonerById '

		try {
			this.logger.verbose('Grabbing riotToken...', ctx)

			const riotToken = this.appService.getRiotToken()

			this.logger.verbose(`riotToken="${riotToken}"`, ctx)
			this.logger.debug('About to contact Riot API...', ctx)

			const getResp: AxiosResponse<Summoner> = await this.httpService
				.get(
					`${SummonerService.BASE}/${SummonerService.ENDPOINT_GET_BY_SUMMONER_ID}/${summonerId}`,
					{
						headers: {
							'Accept-Charset':
								'application/x-www-form-urlencoded; charset=UTF-8',
							'Accept-Language': 'en-US,en;q=0.9',
							'X-Riot-Token': riotToken,
						},
					},
				)
				.toPromise()

			if (getResp.status === HttpStatus.NOT_FOUND) {
				this.logger.debug('Summoner was not found, returning null...', ctx)
				return null
			}

			return getResp.data
		} catch (err) {
			return null
		}
	}
}
