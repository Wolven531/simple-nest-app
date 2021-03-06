import { HttpModule } from '@nestjs/axios'
import { BadRequestException, Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { COMMON_QUEUE_TYPES } from '../constants'
import { CalculatedStats } from '../models/calculated-stats.model'
import { Match } from '../models/match.model'
import { MatchlistService } from '../services/matchlist.service'
import { StatsService } from '../services/stats.service'
import { StatsController } from './stats.controller'

describe('StatsController', () => {
	// constants for testing
	const fakePuuid = 'some-puuid'
	const fakeMatches: Match[] = []
	const fakeKDA = 3.14
	const fakeQueueFilter: keyof typeof COMMON_QUEUE_TYPES = 'aram'

	// standard testing setup
	let controller: StatsController
	let testModule: TestingModule

	// mocks for testing
	let mockCalculateGeneralStats: jest.Mock
	// let mockGetGame: jest.Mock
	let mockGetMatchlist: jest.Mock

	beforeEach(async () => {
		mockCalculateGeneralStats = jest
			.fn()
			.mockReturnValue({ kDA: fakeKDA } as CalculatedStats)
		// mockGetGame = jest.fn().mockResolvedValue(fakeMatch)
		mockGetMatchlist = jest.fn().mockResolvedValue(fakeMatches)

		testModule = await Test.createTestingModule({
			controllers: [StatsController],
			imports: [HttpModule],
			providers: [
				{
					provide: MatchlistService,
					useFactory: () =>
						({
							v5GetMatchlist: mockGetMatchlist,
						} as unknown as MatchlistService),
				},
				{
					provide: StatsService,
					useFactory: () =>
						({
							calculateGeneralStats: mockCalculateGeneralStats,
						} as unknown as StatsService),
				},
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
								name: 'puuid',
								type: 'string',
							},
						],
					}),
				)
			})
		})

		describe(`invoke getSummaryForAccountId("${fakePuuid}", undefined, "${fakeQueueFilter}")`, () => {
			let capturedError: Error
			let resp: CalculatedStats

			beforeEach(async () => {
				try {
					resp = await controller.getSummaryForAccountId(
						fakePuuid,
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
					fakePuuid,
					fakeMatches,
				)
				expect(mockGetMatchlist).toHaveBeenCalledTimes(1)
				expect(mockGetMatchlist).toHaveBeenLastCalledWith(
					fakePuuid,
					10, // from endpoint default
					fakeQueueFilter,
				)
				expect(resp).toMatchObject({ kDA: fakeKDA } as CalculatedStats)
			})
		})
	})
})
