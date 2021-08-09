import { HttpModule } from '@nestjs/axios'
import { Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { ChampionMastery } from '../models/champion-mastery.model'
import { Summoner } from '../models/summoner.model'
import { MasteryService } from '../services/mastery.service'
import { SummonerService } from '../services/summoner.service'
import { MasteryController, SummonerWithMastery } from './mastery.controller'

describe('MasteryController', () => {
	const fakeMasteryTotal = 57
	const fakeSummonerId = 'some-summ-id'
	const fakeSummoner: Summoner = {
		accountId: `${fakeSummonerId}-account`,
		id: fakeSummonerId,
		name: 'some name',
		profileIconId: 1,
		puuid: `${fakeSummonerId}-puuid`,
		revisionDate: new Date(2021, 7, 1).getTime(),
		summonerLevel: 2,
	}
	const fakeChampionMasteries: ChampionMastery[] = [
		new ChampionMastery(
			1,
			2,
			1000,
			231,
			1234,
			true,
			new Date(2021, 8, 1).getTime(),
			fakeSummonerId,
			3,
		),
	]

	let controller: MasteryController
	let testModule: TestingModule
	let mockGetAllChampionMasteries: jest.Mock
	let mockGetMasteryTotal: jest.Mock
	let mockGetSummonerById: jest.Mock

	beforeEach(async () => {
		mockGetAllChampionMasteries = jest
			.fn()
			.mockResolvedValue(fakeChampionMasteries)
		mockGetMasteryTotal = jest.fn().mockResolvedValue(fakeMasteryTotal)
		mockGetSummonerById = jest.fn().mockResolvedValue(fakeSummoner)

		testModule = await Test.createTestingModule({
			controllers: [MasteryController],
			imports: [HttpModule],
			providers: [
				{
					provide: MasteryService,
					useFactory: () =>
						({
							getAllChampionMasteries:
								mockGetAllChampionMasteries,
							getMasteryTotal: mockGetMasteryTotal,
						} as unknown as MasteryService),
				},
				{
					provide: SummonerService,
					useFactory: () =>
						({
							getSummonerById: mockGetSummonerById,
						} as unknown as SummonerService),
				},
				Logger,
			],
		}).compile()

		controller = testModule.get(MasteryController)
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

		describe('invoke getMasteryTotal() w/ summonerId', () => {
			let resp: number | SummonerWithMastery

			beforeEach(async () => {
				resp = await controller.getMasteryTotal(fakeSummonerId)
			})

			it('invokes service methods properly and returns mocked value', () => {
				expect(mockGetMasteryTotal).toHaveBeenCalledTimes(1)
				expect(mockGetMasteryTotal).toHaveBeenLastCalledWith(
					fakeSummonerId,
				)

				expect(mockGetSummonerById).not.toHaveBeenCalled()

				expect(resp).toBe(fakeMasteryTotal)
			})
		})

		describe('invoke getAllChampionMasteries() w/ summonerId', () => {
			let resp: ChampionMastery[]

			beforeEach(async () => {
				resp = await controller.getAllChampionMasteries(fakeSummonerId)
			})

			it('invokes service methods properly and returns mocked value', () => {
				expect(mockGetAllChampionMasteries).toHaveBeenCalledTimes(1)
				expect(mockGetAllChampionMasteries).toHaveBeenLastCalledWith(
					fakeSummonerId,
				)

				expect(resp).toBe(fakeChampionMasteries)
			})
		})

		describe('invoke getMasteryTotal() w/ summonerId and withUser=true', () => {
			let resp: number | SummonerWithMastery

			beforeEach(async () => {
				resp = await controller.getMasteryTotal(fakeSummonerId, true)
			})

			it('invokes service methods properly and returns mocked values (including user data)', () => {
				expect(mockGetMasteryTotal).toHaveBeenCalledTimes(1)
				expect(mockGetMasteryTotal).toHaveBeenLastCalledWith(
					fakeSummonerId,
				)

				expect(mockGetSummonerById).toHaveBeenCalledTimes(1)
				expect(mockGetSummonerById).toHaveBeenLastCalledWith(
					fakeSummonerId,
				)

				expect(resp).toEqual({
					...fakeSummoner,
					masteryTotal: fakeMasteryTotal,
				} as SummonerWithMastery)
			})
		})
	})
})
