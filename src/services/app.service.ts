import { HttpService } from '@nestjs/axios'
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'
import { ENV_API_KEY, ENV_API_KEY_DEFAULT, REGION } from '../constants'

@Injectable()
export class AppService {
	private static readonly BASE = `https://${REGION}.api.riotgames.com`
	private static readonly ENDPOINT_STATUS = 'lol/status/v3/shard-data'

	private overrideToken: string

	constructor(
		@Inject(ConfigService)
		private readonly configService: ConfigService,
		@Inject(HttpService)
		private readonly httpService: HttpService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	/**
	 * This method uses the ConfigService to check if the currently loaded Riot API token is valid
	 *
	 * @returns Promise<boolean> - true if the Riot API token can be used
	 *   to successfully retrieve data from the Riot API; false otherwise
	 */
	async isRiotTokenValid(): Promise<boolean> {
		const ctx = ' isRiotTokenValid | App-Svc '

		try {
			this.logger.verbose('Grabbing riotToken...', ctx)

			const riotToken = this.getRiotToken()

			this.logger.verbose(`riotToken="${riotToken}"`, ctx)
			this.logger.debug('About to contact Riot API...', ctx)

			const getResp = await firstValueFrom(
				this.httpService.get(
					`${AppService.BASE}/${AppService.ENDPOINT_STATUS}`,
					{
						headers: {
							'Accept-Charset':
								'application/x-www-form-urlencoded; charset=UTF-8',
							'Accept-Language': 'en-US,en;q=0.9',
							'X-Riot-Token': riotToken,
							// "Origin": "https://developer.riotgames.com",
							// "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
						},
					},
				),
			)

			this.logger.debug(
				`Returning comparison of HttpStatus.OK 200 to response status ${getResp.status}...`,
				ctx,
			)

			return getResp.status === HttpStatus.OK
		} catch (err) {
			return false
		}
	}

	/**
	 * This method returns a riot token from either the environment variable or the override variable
	 *
	 * @returns string - Riot API token value to use
	 */
	getRiotToken(): string {
		if (!!this.overrideToken && this.overrideToken.length > 0) {
			return this.overrideToken
		}

		const riotToken = this.configService.get<string>(
			ENV_API_KEY,
			ENV_API_KEY_DEFAULT,
		)

		return riotToken
	}

	/**
	 * This method sets a variable that can dynamically override the loaded server riot token
	 *
	 * @param newToken - string The new token value to use
	 */
	setRiotToken(newToken: string): void {
		this.overrideToken = newToken
	}
}
