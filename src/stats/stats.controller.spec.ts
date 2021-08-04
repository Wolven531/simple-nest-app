import { HttpModule } from '@nestjs/axios'
import { BadRequestException, Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { COMMON_QUEUE_TYPES } from '../constants'
import { CalculatedStats } from '../models/calculated-stats.model'
import { Game } from '../models/game.model'
import { Match } from '../models/match.model'
import { MatchlistService } from '../services/matchlist.service'
import { StatsService } from '../services/stats.service'
import { StatsController } from './stats.controller'

describe('StatsController', () => {
	// constants for testing
	const fakeGame: Game = {} as Game
	const fakeGames: Game[] = []

	// standard testing setup
	let controller: StatsController
	let testModule: TestingModule

	// mocks for testing
	// let mockGetGame: jest.Mock
	let mockGetMatchlist: jest.Mock

	beforeEach(async () => {
		// mockGetGame = jest.fn().mockResolvedValue(fakeGame)
		mockGetMatchlist = jest.fn().mockResolvedValue(fakeGames)

		testModule = await Test.createTestingModule({
			controllers: [StatsController],
			imports: [HttpModule],
			providers: [
				{
					provide: MatchlistService,
					useFactory: () =>
						({
							// v4GetGame: mockGetGame,
							v4GetMatchlist: mockGetMatchlist,
						} as unknown as MatchlistService),
				},
				// {
				// 	provide: MatchlistService,
				// 	useFactory: () =>
				// 		({
				// 			// v4GetGame: mockGetGame,
				// 			v4GetMatchlist: mockGetMatchlist,
				// 		} as unknown as MatchlistService),
				// },
				StatsService, // using actual service
				Logger,
			],
		}).compile()

		controller = testModule.get(StatsController)
	})

	afterEach(async () => {
		await testModule.close()
	})

	describe('w/ mocked logger functions [ debug, error, log, verbose ]', () => {
		beforeEach(() => {
			toggleMockedLogger(testModule)
		})

		afterEach(() => {
			toggleMockedLogger(testModule, false)
		})

		describe('invoke getSummaryForAccountId("", undefined)', () => {
			let capturedError: Error
			let resp: CalculatedStats

			beforeEach(async () => {
				try {
					resp = await controller.getSummaryForAccountId(
						'',
						undefined,
						undefined,
					)
				} catch (err) {
					capturedError = err
				}
			})

			it('throws BadRequestException', () => {
				expect(resp).toBeUndefined()
				expect(capturedError).toEqual(
					new BadRequestException({
						error: true,
						headersRequired: [],
						queryParamsRequired: [
							{
								name: 'accountId',
								type: 'string',
							},
						],
					}),
				)
			})
		})

		describe('invoke getSummaryForAccountId("someAccountId", undefined)', () => {
			const fakeAccountId = 'someAccountId'
			const fakeKDA = 3.14
			const fakeQueueFilter: keyof typeof COMMON_QUEUE_TYPES = 'aram'
			let capturedError: Error
			let mockCalculateGeneralStats: jest.Mock
			let resp: CalculatedStats

			beforeEach(async () => {
				mockCalculateGeneralStats = jest.fn(
					(targetAccountKey, games) =>
						({ kDA: fakeKDA } as CalculatedStats),
				)

				jest.spyOn(
					testModule.get(StatsService),
					'calculateGeneralStats',
				).mockImplementationOnce(mockCalculateGeneralStats)

				try {
					resp = await controller.getSummaryForAccountId(
						fakeAccountId,
						undefined,
						fakeQueueFilter,
					)
				} catch (err) {
					capturedError = err
				}
			})

			it('invokes MatchlistSvc.getMatchlist() and StatsSvc.calculateGeneralStats(), does NOT throw error', () => {
				expect(capturedError).toBeUndefined()
				expect(mockCalculateGeneralStats).toHaveBeenCalledTimes(1)
				expect(mockCalculateGeneralStats).toHaveBeenLastCalledWith(
					fakeAccountId,
					fakeGames,
				)
				expect(mockGetMatchlist).toHaveBeenCalledTimes(1)
				expect(mockGetMatchlist).toHaveBeenLastCalledWith(
					fakeAccountId,
					10, // from endpoint default
					true,
					fakeQueueFilter,
				)
				expect(resp).toMatchObject({ kDA: fakeKDA } as CalculatedStats)
			})
		})
	})
})
