import { BadRequestException, HttpModule, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { CalculatedStats } from '../models/calculated-stats.model'
import { Game } from '../models/game.model'
import { AppService } from '../services/app.service'
import { JsonLoaderService } from '../services/json-loader.service'
import { MatchlistService } from '../services/matchlist.service'
import { StatsService } from '../services/stats.service'
import { StatsController } from './stats.controller'

describe('StatsController', () => {
	let controller: StatsController
	let testModule: TestingModule

	beforeEach(async () => {
		testModule = await Test.createTestingModule({
			controllers: [StatsController],
			imports: [HttpModule],
			providers: [
				MatchlistService,
				AppService,
				ConfigService,
				StatsService,
				Logger,
				JsonLoaderService,
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

		describe('invoke getSummary(undefined, undefined)', () => {
			let capturedError: Error
			let resp: CalculatedStats

			beforeEach(async () => {
				try {
					resp = await controller.getSummary(undefined, undefined)
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

		describe('invoke getSummary("someAccountId", undefined)', () => {
			const fakeKDA = 3.14
			let capturedError: Error
			let mockCalculateGeneralStats: jest.Mock
			let mockGetMatchlist: jest.Mock
			let resp: CalculatedStats

			beforeEach(async () => {
				mockCalculateGeneralStats = jest.fn(
					(targetAccountKey, games) => ({ kDA: fakeKDA } as CalculatedStats),
				)
				mockGetMatchlist = jest.fn(
					(apiKey, accountId, getLastX, includeGameData) =>
						Promise.resolve([] as Array<Game>),
				)

				jest
					.spyOn(testModule.get(MatchlistService), 'getMatchlist')
					.mockImplementationOnce(mockGetMatchlist)
				jest
					.spyOn(testModule.get(StatsService), 'calculateGeneralStats')
					.mockImplementationOnce(mockCalculateGeneralStats)

				try {
					resp = await controller.getSummary('someAccountId', undefined)
				} catch (err) {
					capturedError = err
				}
			})

			it('invokes MatchlistSvc.getMatchlist() and StatsSvc.calculateGeneralStats(), does NOT throw error', () => {
				expect(capturedError).toBeUndefined()
				expect(mockCalculateGeneralStats).toHaveBeenCalledTimes(1)
				expect(mockGetMatchlist).toHaveBeenCalledTimes(1)
				expect(resp).toMatchObject({ kDA: fakeKDA } as CalculatedStats)
			})
		})
	})
})
