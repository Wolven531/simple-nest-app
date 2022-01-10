import { HttpModule } from '@nestjs/axios'
import { Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { testCases_CalculateGeneralStats } from '../../test/test-cases'
import { toggleMockedLogger } from '../../test/utils'
import { CalculatedStats } from '../models/calculated-stats.model'
import { StatsService } from './stats.service'

describe('Stats Service', () => {
	let service: StatsService
	let testModule: TestingModule

	beforeEach(async () => {
		testModule = await Test.createTestingModule({
			controllers: [],
			imports: [HttpModule],
			providers: [StatsService, Logger],
		}).compile()

		service = testModule.get(StatsService)
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

		testCases_CalculateGeneralStats.forEach(
			({ expectedResult, paramGames, paramPuuid, testDescription }) => {
				describe(`invoke calculateGeneralStats("${paramPuuid}", ${paramGames.length} games) [${testDescription}]`, () => {
					let actualResult: CalculatedStats

					beforeEach(() => {
						actualResult = service.calculateGeneralStats(
							paramPuuid,
							paramGames,
						)
					})

					it('returns expected CalculatedStats', () => {
						expect(actualResult).toEqual(expectedResult)
					})
				})
			},
		)
	})
})
