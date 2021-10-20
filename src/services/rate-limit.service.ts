import { Inject, Injectable, Logger } from '@nestjs/common'
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible'
import { KEY_RATE_APP_LONG, KEY_RATE_APP_SHORT } from '../constants'

@Injectable()
export class RateLimitService {
	private appLongRateLimiter: RateLimiterMemory
	private appShortRateLimiter: RateLimiterMemory

	/**
	 *
	 */
	constructor(@Inject(Logger) private readonly logger: Logger) {
		// copied from response headers
		// "X-App-Rate-Limit": "20:1,100:120"
		// "X-Method-Rate-Limit": "1000:10"

		// limit is 100 requests per 2 minutes
		this.appLongRateLimiter = new RateLimiterMemory({
			duration: 120,
			keyPrefix: KEY_RATE_APP_LONG,
			points: 100,
		})
		// limit is 20 requests per second
		this.appShortRateLimiter = new RateLimiterMemory({
			duration: 1,
			keyPrefix: KEY_RATE_APP_SHORT,
			points: 20,
		})
	}

	/**
	 * This method provides a single point of interaction w/ app-wide rate limits
	 * to prevent this API from exceeding Riot's API rate limits
	 *
	 * @returns true if app rate limit is not capped; false otherwise
	 */
	async consumeAppLimit(): Promise<boolean> {
		let firstRateLimitErrorKey = ''

		const [errAppLong, errAppShort] = await Promise.all([
			this.appLongRateLimiter
				.consume(KEY_RATE_APP_LONG, 1)
				.then((rateAppLong: RateLimiterRes) => {
					this.logger.log(
						`rateAppLong = ${JSON.stringify(rateAppLong)}`,
						' consumeAppLimit | rate-limit-svc ',
					)
					return null
				})
				.catch((err: RateLimiterRes) => {
					if (firstRateLimitErrorKey === '') {
						firstRateLimitErrorKey = KEY_RATE_APP_LONG
					}
					return err
				}),
			this.appShortRateLimiter
				.consume(KEY_RATE_APP_SHORT, 1)
				.then((rateAppShort: RateLimiterRes) => {
					this.logger.log(
						`rateAppShort = ${JSON.stringify(rateAppShort)}`,
						' consumeAppLimit | rate-limit-svc ',
					)
					return null
				})
				.catch((err: RateLimiterRes) => {
					if (firstRateLimitErrorKey === '') {
						firstRateLimitErrorKey = KEY_RATE_APP_SHORT
					}
					return err
				}),
		])

		if (firstRateLimitErrorKey !== '') {
			this.logger.error(
				`Rate limit hit - "${firstRateLimitErrorKey}"; app limits = ${JSON.stringify(
					[errAppLong, errAppShort],
				)}`,
				' consumeLimit | rate-limit-svc ',
			)

			return false
		}

		return true
	}
}
