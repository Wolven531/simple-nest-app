import { HttpModule, HttpService } from '@nestjs/axios'
import { Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { from } from 'rxjs'
import { toggleMockedLogger } from '../../test/utils'
import {
	COMMON_QUEUE_TYPES,
	MAX_NUM_MATCHES,
	MIN_NUM_MATCHES,
} from '../constants'
import { Game } from '../models/game.model'
import { Match } from '../models/match.model'
import { Matchlist } from '../models/matchlist.model'
import { AppService } from './app.service'
import { MatchlistService } from './matchlist.service'
import { RateLimitService } from './rate-limit.service'

type TestCase_GetGame = {
	description: string
	expectedCountHttpGet: number
	expectedResult: Game | null
	mockHttpGet: jest.Mock
	paramGameId: number
}
type TestCase_GetMatchlist = {
	description: string
	expectedCountHttpGet: number
	expectedCountGetGame: number
	expectedUrlParamCount: number
	expectedUrlParamQueueFilter: string
	expectedResult: Match[] | Game[]
	mockGetGame: jest.Mock
	mockHttpGet: jest.Mock
	paramAccountId: string
	paramGetLastX: number | undefined
	paramIncludeGameData: boolean | undefined
	paramQueueType: keyof typeof COMMON_QUEUE_TYPES | undefined
}

describe('Matchlist Service', () => {
	const fakeAPIKey = 'some-api-key'

	const testCases_getGame: TestCase_GetGame[] = [
		{
			description: 'Http error occurs',
			expectedCountHttpGet: 1,
			expectedResult: null,
			mockHttpGet: jest.fn(() =>
				from(Promise.reject(new Error('Fake ajw error'))),
			),
			paramGameId: 1,
		},
		{
			description: 'Returned data is bad',
			expectedCountHttpGet: 1,
			expectedResult: null,
			mockHttpGet: jest.fn(() => from(Promise.resolve({}))),
			paramGameId: 2,
		},
		{
			description: 'Returned data is good',
			expectedCountHttpGet: 1,
			expectedResult: { gameCreation: 333, gameDuration: 444 } as Game,
			mockHttpGet: jest.fn(() =>
				from(
					Promise.resolve({
						data: { gameCreation: 333, gameDuration: 444 } as Game,
					}),
				),
			),
			paramGameId: 3,
		},
	]
	const testCases_getMatchlist: TestCase_GetMatchlist[] = [
		{
			description: 'Http error occurs',
			expectedCountHttpGet: 1,
			expectedCountGetGame: 0,
			expectedUrlParamCount: 10,
			expectedUrlParamQueueFilter: '',
			expectedResult: [],
			mockGetGame: jest.fn(() => Promise.resolve()),
			mockHttpGet: jest.fn(() =>
				from(Promise.reject(new Error('Fake ajw error'))),
			),
			paramAccountId: 'some-account-id',
			paramGetLastX: undefined,
			paramIncludeGameData: undefined,
			paramQueueType: undefined,
		},
		{
			description: 'Returned data is bad',
			expectedCountHttpGet: 1,
			expectedCountGetGame: 0,
			expectedUrlParamCount: 10,
			expectedUrlParamQueueFilter: '',
			expectedResult: [],
			mockGetGame: jest.fn(() => Promise.resolve()),
			mockHttpGet: jest.fn(() => from(Promise.resolve({}))),
			paramAccountId: 'some-account-id',
			paramGetLastX: undefined,
			paramIncludeGameData: undefined,
			paramQueueType: undefined,
		},
		{
			description: 'No filters - Returned data is good',
			expectedCountHttpGet: 1,
			expectedCountGetGame: 0,
			expectedUrlParamCount: 10,
			expectedUrlParamQueueFilter: '',
			expectedResult: [
				new Match(
					222,
					'NONE',
					2020,
					'NA1',
					100,
					COMMON_QUEUE_TYPES.aram.id,
					'NONE',
					new Date(2020, 1, 1).getTime(),
				),
			],
			mockGetGame: jest.fn(() => Promise.resolve()),
			mockHttpGet: jest.fn(() =>
				from(
					Promise.resolve({
						data: {
							endIndex: 1,
							startIndex: 0,
							matches: [
								new Match(
									222,
									'NONE',
									2020,
									'NA1',
									100,
									COMMON_QUEUE_TYPES.aram.id,
									'NONE',
									new Date(2020, 1, 1).getTime(),
								),
							] as Match[],
							totalGames: 1,
						} as Matchlist,
					}),
				),
			),
			paramAccountId: 'some-account-id',
			paramGetLastX: undefined,
			paramIncludeGameData: undefined,
			paramQueueType: undefined,
		},
		{
			description:
				'Get Last X is below MIN_NUM_MATCHES - Returned data is good',
			expectedCountHttpGet: 1,
			expectedCountGetGame: 0,
			expectedUrlParamCount: MIN_NUM_MATCHES,
			expectedUrlParamQueueFilter: '',
			expectedResult: [
				new Match(
					222,
					'NONE',
					2020,
					'NA1',
					100,
					COMMON_QUEUE_TYPES.aram.id,
					'NONE',
					new Date(2020, 1, 1).getTime(),
				),
			],
			mockGetGame: jest.fn(() => Promise.resolve()),
			mockHttpGet: jest.fn(() =>
				from(
					Promise.resolve({
						data: {
							endIndex: 1,
							startIndex: 0,
							matches: [
								new Match(
									222,
									'NONE',
									2020,
									'NA1',
									100,
									COMMON_QUEUE_TYPES.aram.id,
									'NONE',
									new Date(2020, 1, 1).getTime(),
								),
							] as Match[],
							totalGames: 1,
						} as Matchlist,
					}),
				),
			),
			paramAccountId: 'some-account-id',
			paramGetLastX: MIN_NUM_MATCHES - 1,
			paramIncludeGameData: undefined,
			paramQueueType: undefined,
		},
		{
			description:
				'Get Last X is above MAX_NUM_MATCHES - Returned data is good',
			expectedCountHttpGet: 1,
			expectedCountGetGame: 0,
			expectedUrlParamCount: MAX_NUM_MATCHES,
			expectedUrlParamQueueFilter: '',
			expectedResult: [
				new Match(
					222,
					'NONE',
					2020,
					'NA1',
					100,
					COMMON_QUEUE_TYPES.aram.id,
					'NONE',
					new Date(2020, 1, 1).getTime(),
				),
			],
			mockGetGame: jest.fn(() => Promise.resolve()),
			mockHttpGet: jest.fn(() =>
				from(
					Promise.resolve({
						data: {
							endIndex: 1,
							startIndex: 0,
							matches: [
								new Match(
									222,
									'NONE',
									2020,
									'NA1',
									100,
									COMMON_QUEUE_TYPES.aram.id,
									'NONE',
									new Date(2020, 1, 1).getTime(),
								),
							] as Match[],
							totalGames: 1,
						} as Matchlist,
					}),
				),
			),
			paramAccountId: 'some-account-id',
			paramGetLastX: MAX_NUM_MATCHES + 1,
			paramIncludeGameData: undefined,
			paramQueueType: undefined,
		},
		{
			description: 'Include game data - Returned data is good',
			expectedCountHttpGet: 1,
			expectedCountGetGame: 1,
			expectedUrlParamCount: 1,
			expectedUrlParamQueueFilter: '',
			expectedResult: [
				new Game(
					222,
					333,
					444,
					'CLASSIC',
					'MATCHED_GAME',
					'v1',
					1,
					[],
					[],
					'p1',
					COMMON_QUEUE_TYPES.aram.id,
					2020,
					[],
				),
			],
			mockGetGame: jest.fn(() =>
				Promise.resolve(
					new Game(
						222,
						333,
						444,
						'CLASSIC',
						'MATCHED_GAME',
						'v1',
						1,
						[],
						[],
						'p1',
						COMMON_QUEUE_TYPES.aram.id,
						2020,
						[],
					),
				),
			),
			mockHttpGet: jest.fn(() =>
				from(
					Promise.resolve({
						data: {
							endIndex: 1,
							startIndex: 0,
							matches: [
								new Match(
									222,
									'NONE',
									2020,
									'NA1',
									100,
									COMMON_QUEUE_TYPES.aram.id,
									'NONE',
									new Date(2020, 1, 1).getTime(),
								),
							] as Match[],
							totalGames: 1,
						} as Matchlist,
					}),
				),
			),
			paramAccountId: 'some-account-id',
			paramGetLastX: 1,
			paramIncludeGameData: true,
			paramQueueType: undefined,
		},
		{
			description: 'include queue filter - Returned data is good',
			expectedCountHttpGet: 1,
			expectedCountGetGame: 1,
			expectedUrlParamCount: 1,
			expectedUrlParamQueueFilter: `&queue=${COMMON_QUEUE_TYPES.aram.id}`,
			expectedResult: [
				new Game(
					222,
					333,
					444,
					'CLASSIC',
					'MATCHED_GAME',
					'v1',
					1,
					[],
					[],
					'p1',
					COMMON_QUEUE_TYPES.aram.id,
					2020,
					[],
				),
			],
			mockGetGame: jest.fn(() =>
				Promise.resolve(
					new Game(
						222,
						333,
						444,
						'CLASSIC',
						'MATCHED_GAME',
						'v1',
						1,
						[],
						[],
						'p1',
						COMMON_QUEUE_TYPES.aram.id,
						2020,
						[],
					),
				),
			),
			mockHttpGet: jest.fn(() =>
				from(
					Promise.resolve({
						data: {
							endIndex: 1,
							startIndex: 0,
							matches: [
								new Match(
									222,
									'NONE',
									2020,
									'NA1',
									100,
									COMMON_QUEUE_TYPES.aram.id,
									'NONE',
									new Date(2020, 1, 1).getTime(),
								),
							] as Match[],
							totalGames: 1,
						} as Matchlist,
					}),
				),
			),
			paramAccountId: 'some-account-id',
			paramGetLastX: 1,
			paramIncludeGameData: true,
			paramQueueType: 'aram',
		},
	]
	let service: MatchlistService
	let testModule: TestingModule
	let mockGetRiotToken: jest.Mock

	beforeEach(async () => {
		mockGetRiotToken = jest.fn().mockReturnValue(fakeAPIKey)

		testModule = await Test.createTestingModule({
			controllers: [],
			imports: [HttpModule],
			providers: [
				{
					provide: AppService,
					useFactory: () => ({
						getRiotToken: mockGetRiotToken,
					}),
				},
				{
					provide: RateLimitService,
					useFactory: () => ({
						consumeAppLimit: jest.fn().mockResolvedValue(true),
					}),
				},
				MatchlistService,
				Logger,
			],
		}).compile()

		service = testModule.get(MatchlistService)
	})

	afterEach(async () => {
		await testModule.close()
	})

	describe('w/ mocked logger functions [ debug, error, log, verbose ]', () => {
		const fakeGameId = 123
		const fakeGame: Game = {
			gameCreation: 333,
			gameDuration: 444,
			gameId: fakeGameId,
		} as Game

		beforeEach(() => {
			toggleMockedLogger(testModule)
		})

		afterEach(() => {
			toggleMockedLogger(testModule, false)
		})

		// describe('invoke getGame() enough to hit app short rate limit', () => {
		// 	const appShortRateLimit = 20 // requests
		// 	const appShortTimeLimit = 1 // seconds
		// 	let result: Game | null
		// 	let mockHttpGet: jest.Mock

		// 	beforeEach(async () => {
		// 		mockHttpGet = jest.fn(() =>
		// 			from(
		// 				Promise.resolve({
		// 					data: fakeGame,
		// 				}),
		// 			),
		// 		)

		// 		jest.spyOn(
		// 			testModule.get(HttpService),
		// 			'get',
		// 		).mockImplementation(mockHttpGet)

		// 		jest.useFakeTimers()

		// 		const callsToMake = []

		// 		for (
		// 			let consecutiveCall = 0;
		// 			consecutiveCall < appShortRateLimit;
		// 			consecutiveCall++
		// 		) {
		// 			callsToMake.push(service.v4GetGame(fakeGameId))
		// 		}

		// 		await Promise.all(callsToMake)
		// 	})

		// 	it('invokes HttpService.get() at rate limit', () => {
		// 		expect(mockHttpGet).toHaveBeenCalledTimes(appShortRateLimit)
		// 	})

		// 	describe('invoke getGame() once more to exceed rate limit', () => {
		// 		beforeEach(async () => {
		// 			// attempt one additional call to trigger rate limit
		// 			result = await service.v4GetGame(fakeGameId)
		// 		})

		// 		it('returns null (rate limit breach), only invokes HttpService.get() at rate limit', () => {
		// 			expect(mockHttpGet).toHaveBeenCalledTimes(appShortRateLimit)

		// 			expect(result).toBeNull()
		// 		})
		// 	})

		// 	describe('invoke getGame() after rate limit recovers', () => {
		// 		beforeEach(async () => {
		// 			jest.advanceTimersByTime(appShortTimeLimit * 1000)

		// 			// attempt one additional call, which should work since time has passed
		// 			result = await service.v4GetGame(fakeGameId)
		// 		})

		// 		it('returns Game (rate limit recovered), invokes HttpService.get() every time', () => {
		// 			expect(mockHttpGet).toHaveBeenCalledTimes(
		// 				appShortRateLimit + 1,
		// 			)

		// 			expect(result).toEqual(fakeGame)
		// 		})
		// 	})
		// })

		// describe('invoke getGame() enough to hit app long rate limit, w/o hitting short limit', () => {
		// 	const appLongRateLimit = 100 // requests
		// 	const appLongTimeLimit = 120 // seconds
		// 	const timeBetweenBursts =
		// 		(appLongTimeLimit * 1000) / appLongRateLimit // millis
		// 	let result: Game | null
		// 	let mockHttpGet: jest.Mock

		// 	beforeEach(async () => {
		// 		mockHttpGet = jest.fn(() =>
		// 			from(
		// 				Promise.resolve({
		// 					data: fakeGame,
		// 				}),
		// 			),
		// 		)

		// 		jest.spyOn(
		// 			testModule.get(HttpService),
		// 			'get',
		// 		).mockImplementation(mockHttpGet)

		// 		jest.useFakeTimers()

		// 		const callsToMake = []

		// 		for (
		// 			let consecutiveCall = 0;
		// 			consecutiveCall < appLongRateLimit;
		// 			consecutiveCall++
		// 		) {
		// 			callsToMake.push(service.v4GetGame(fakeGameId))

		// 			// every 20th call, advance time (based on short rate limit)
		// 			if (consecutiveCall % 20 === 0) {
		// 				callsToMake.push(
		// 					new Promise((resolve) => {
		// 						jest.advanceTimersByTime(timeBetweenBursts) // advance to avoid short rate limit, just enough to hit long rate limit
		// 						resolve(undefined)
		// 					}),
		// 				)
		// 			}
		// 		}

		// 		await Promise.all(callsToMake)
		// 	})

		// 	it('invokes HttpService.get() at rate limit', () => {
		// 		expect(mockHttpGet).toHaveBeenCalledTimes(appLongRateLimit)
		// 	})

		// 	describe('invoke getGame() once more to exceed rate limit', () => {
		// 		beforeEach(async () => {
		// 			// attempt one additional call to trigger rate limit
		// 			result = await service.v4GetGame(fakeGameId)
		// 		})

		// 		it('returns null (rate limit breach), only invokes HttpService.get() at rate limit', () => {
		// 			expect(mockHttpGet).toHaveBeenCalledTimes(appLongRateLimit)

		// 			expect(result).toBeNull()
		// 		})
		// 	})

		// 	describe('invoke getGame() after rate limit recovers', () => {
		// 		beforeEach(async () => {
		// 			jest.advanceTimersByTime(appLongTimeLimit * 1000)

		// 			// attempt one additional call, which should work since time has passed
		// 			result = await service.v4GetGame(fakeGameId)
		// 		})

		// 		it('returns Game (rate limit recovered), invokes HttpService.get() every time', () => {
		// 			expect(mockHttpGet).toHaveBeenCalledTimes(
		// 				appLongRateLimit + 1,
		// 			)

		// 			expect(result).toEqual(fakeGame)
		// 		})
		// 	})
		// })

		xdescribe('invoke getGame() enough to hit method rate limit', () => {
			const methodRateLimit = 1000 // requests
			const methodTimeLimit = 10 // seconds
			let result: Game | null
			let mockHttpGet: jest.Mock

			beforeEach(async () => {
				mockHttpGet = jest.fn(() =>
					from(
						Promise.resolve({
							data: fakeGame,
						}),
					),
				)

				jest.spyOn(
					testModule.get(HttpService),
					'get',
				).mockImplementation(mockHttpGet)

				jest.useFakeTimers()

				const callsToMake = []

				for (
					let consecutiveCall = 0;
					consecutiveCall < methodRateLimit;
					consecutiveCall++
				) {
					callsToMake.push(service.v4GetGame(fakeGameId))
				}

				await Promise.all(callsToMake)
			})

			it('invokes HttpService.get() at rate limit', () => {
				expect(mockHttpGet).toHaveBeenCalledTimes(methodRateLimit)
			})

			describe('invoke getGame() once more to exceed rate limit', () => {
				beforeEach(async () => {
					// attempt one additional call to trigger rate limit
					result = await service.v4GetGame(fakeGameId)
				})

				it('returns null (rate limit breach), only invokes HttpService.get() at rate limit', () => {
					expect(mockHttpGet).toHaveBeenCalledTimes(methodRateLimit)

					expect(result).toBeNull()
				})
			})

			describe('invoke getGame() after rate limit recovers', () => {
				beforeEach(async () => {
					jest.advanceTimersByTime(methodTimeLimit * 1000)

					// attempt one additional call, which should work since time has passed
					result = await service.v4GetGame(fakeGameId)
				})

				it('returns Game (rate limit recovered), invokes HttpService.get() every time', () => {
					expect(mockHttpGet).toHaveBeenCalledTimes(
						methodRateLimit + 1,
					)

					expect(result).toEqual(fakeGame)
				})
			})
		})

		testCases_getGame.forEach(
			({
				description,
				expectedCountHttpGet,
				expectedResult,
				mockHttpGet,
				paramGameId,
			}) => {
				describe(`w/ mocked HttpGet (${description})`, () => {
					beforeEach(() => {
						jest.spyOn(
							testModule.get(HttpService),
							'get',
						).mockImplementation(mockHttpGet)
					})

					describe(`invoke getGame(${paramGameId})`, () => {
						let actualResult: Game | null

						beforeEach(async () => {
							actualResult = await service.v4GetGame(paramGameId)
						})

						it('uses AppService for riotToken, invokes get() correctly and returns expected result', () => {
							expect(mockGetRiotToken).toHaveBeenCalledTimes(1)

							expect(mockHttpGet).toHaveBeenCalledTimes(
								expectedCountHttpGet,
							)
							if (expectedCountHttpGet > 0) {
								expect(mockHttpGet).toHaveBeenLastCalledWith(
									`https://na1.api.riotgames.com/lol/match/v4/matches/${paramGameId}`,
									{
										headers: {
											'Accept-Charset':
												'application/x-www-form-urlencoded; charset=UTF-8',
											'Accept-Language': 'en-US,en;q=0.9',
											'X-Riot-Token': fakeAPIKey,
										},
									},
								)
							}

							expect(actualResult).toEqual(expectedResult)
						})
					})
				})
			},
		)

		testCases_getMatchlist.forEach(
			({
				description,
				expectedCountHttpGet,
				expectedCountGetGame,
				expectedUrlParamCount,
				expectedUrlParamQueueFilter,
				expectedResult,
				mockGetGame,
				mockHttpGet,
				paramAccountId,
				paramGetLastX,
				paramIncludeGameData,
				paramQueueType,
			}) => {
				describe(`w/ mocked HttpGet and v4GetGame (${description})`, () => {
					beforeEach(() => {
						jest.spyOn(service, 'v4GetGame').mockImplementation(
							mockGetGame,
						)
						jest.spyOn(
							testModule.get(HttpService),
							'get',
						).mockImplementation(mockHttpGet)
					})

					describe(`invoke getMatchlist("${paramAccountId}", ${paramGetLastX}, ${paramIncludeGameData}, ${
						paramQueueType ? `"${paramQueueType}"` : paramQueueType
					})`, () => {
						let actualResult: Game[] | Match[]

						beforeEach(async () => {
							actualResult = await service.v4GetMatchlist(
								paramAccountId,
								paramGetLastX,
								paramIncludeGameData,
								paramQueueType,
							)
						})

						it('uses AppService for riotToken, invokes get() correctly and returns expected result', () => {
							expect(mockGetRiotToken).toHaveBeenCalledTimes(1)

							expect(mockHttpGet).toHaveBeenCalledTimes(
								expectedCountHttpGet,
							)
							if (expectedCountHttpGet > 0) {
								const expectedFullUrl =
									'https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/'
										.concat(paramAccountId)
										.concat(
											`?endIndex=${expectedUrlParamCount}`,
										)
										.concat(
											paramQueueType
												? expectedUrlParamQueueFilter
												: '',
										)

								expect(mockHttpGet).toHaveBeenLastCalledWith(
									expectedFullUrl,
									{
										headers: {
											'Accept-Charset':
												'application/x-www-form-urlencoded; charset=UTF-8',
											'Accept-Language': 'en-US,en;q=0.9',
											'X-Riot-Token': fakeAPIKey,
										},
									},
								)
							}
							expect(mockGetGame).toHaveBeenCalledTimes(
								expectedCountGetGame,
							)

							expect(actualResult).toEqual(expectedResult)
						})
					})
				})
			},
		)
	})
})
