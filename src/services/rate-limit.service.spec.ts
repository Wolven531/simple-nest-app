import { Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { RateLimitService } from './rate-limit.service'

describe('RateLimitService', () => {
	let service: RateLimitService
	let testModule: TestingModule

	beforeEach(async () => {
		testModule = await Test.createTestingModule({
			controllers: [],
			imports: [],
			providers: [RateLimitService, Logger],
		}).compile()

		service = testModule.get(RateLimitService)
	})

	afterEach(async () => {
		await testModule.close()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('w/ mocked logger functions [ debug, error, log, verbose ]', () => {
		beforeEach(() => {
			toggleMockedLogger(testModule)
		})

		afterEach(() => {
			toggleMockedLogger(testModule, false)
		})

		describe('invoke consumeAppLimit() enough to hit app short rate limit', () => {
			const appShortRateLimit = 20 // requests
			const appShortTimeLimit = 1 // seconds
			let result: boolean

			beforeEach(async () => {
				jest.useFakeTimers()

				const callsToMake = []

				for (
					let consecutiveCall = 0;
					consecutiveCall < appShortRateLimit;
					consecutiveCall++
				) {
					callsToMake.push(
						(async () => {
							result = await service.consumeAppLimit()
						})(),
					)
				}

				await Promise.all(callsToMake)
			})

			it('returns true (at rate limit)', () => {
				expect(result).toBe(true)
			})

			describe('invoke consumeAppLimit() once more to exceed rate limit', () => {
				beforeEach(async () => {
					// attempt one additional call to trigger rate limit
					result = await service.consumeAppLimit()
				})

				it('returns false (rate limit breach)', () => {
					expect(result).toBe(false)
				})
			})

			describe('invoke consumeAppLimit() after rate limit recovers', () => {
				beforeEach(async () => {
					jest.advanceTimersByTime(appShortTimeLimit * 1000)

					// attempt one additional call, which should work since time has passed
					result = await service.consumeAppLimit()
				})

				it('returns true (rate limit recovered)', () => {
					expect(result).toBe(true)
				})
			})
		})

		describe('invoke consumeAppLimit() enough to hit app long rate limit, w/o hitting short limit', () => {
			const appLongRateLimit = 100 // requests
			const appLongTimeLimit = 120 // seconds
			const timeBetweenBursts =
				(appLongTimeLimit * 1000) / appLongRateLimit // millis
			let result: boolean

			beforeEach(async () => {
				jest.useFakeTimers()

				const callsToMake = []

				for (
					let consecutiveCall = 0;
					consecutiveCall < appLongRateLimit;
					consecutiveCall++
				) {
					callsToMake.push(
						(async () => {
							result = await service.consumeAppLimit()
						})(),
					)

					// every 20th call, advance time (based on short rate limit)
					if (consecutiveCall % 20 === 0) {
						callsToMake.push(
							new Promise((resolve) => {
								jest.advanceTimersByTime(timeBetweenBursts) // advance to avoid short rate limit, just enough to hit long rate limit
								resolve(undefined)
							}),
						)
					}
				}

				await Promise.all(callsToMake)
			})

			it('returns true (at rate limit)', () => {
				expect(result).toBe(true)
			})

			describe('invoke consumeAppLimit() once more to exceed rate limit', () => {
				beforeEach(async () => {
					// attempt one additional call to trigger rate limit
					result = await service.consumeAppLimit()
				})

				it('returns false (rate limit breach)', () => {
					expect(result).toBe(false)
				})
			})

			describe('invoke consumeAppLimit() after rate limit recovers', () => {
				beforeEach(async () => {
					jest.advanceTimersByTime(appLongTimeLimit * 1000)

					// attempt one additional call, which should work since time has passed
					result = await service.consumeAppLimit()
				})

				it('returns true (rate limit recovered)', () => {
					expect(result).toBe(true)
				})
			})
		})
	})
})
