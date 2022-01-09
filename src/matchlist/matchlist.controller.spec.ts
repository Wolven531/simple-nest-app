import { HttpModule } from '@nestjs/axios'
import { Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { GameV5 } from '../models/game-v5.model'
import { MatchlistService } from '../services/matchlist.service'
import { MatchlistController } from './matchlist.controller'

describe('MatchlistController', () => {
	const fakeGame: GameV5 = {} as GameV5
	let controller: MatchlistController
	let testModule: TestingModule
	let mockGetGame: jest.Mock
	let mockGetMatchlist: jest.Mock

	beforeEach(async () => {
		mockGetGame = jest.fn().mockResolvedValue(fakeGame)
		mockGetMatchlist = jest.fn().mockResolvedValue([])

		testModule = await Test.createTestingModule({
			controllers: [MatchlistController],
			imports: [HttpModule],
			providers: [
				{
					provide: MatchlistService,
					useFactory: () =>
						({
							// v4GetGame: mockGetGame,
							// v4GetMatchlist: mockGetMatchlist,
							v5GetGame: mockGetGame,
							v5GetMatchlist: mockGetMatchlist,
						} as unknown as MatchlistService),
				},
				Logger,
			],
		}).compile()

		controller = testModule.get(MatchlistController)
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

		describe('invoke getMatchlist()', () => {
			let resp: GameV5[]

			beforeEach(async () => {
				resp = (await controller.getMatchlist('some-puuid')) as GameV5[]
			})

			it('returns empty array', () => {
				expect(mockGetMatchlist).toHaveBeenCalledTimes(1)
				expect(resp).toEqual([])
			})
		})

		describe('invoke getGame()', () => {
			let resp: GameV5

			beforeEach(async () => {
				resp = await controller.getGame('0')
			})

			it('returns empty array', () => {
				expect(mockGetGame).toHaveBeenCalledTimes(1)
				expect(resp).toEqual(fakeGame)
			})
		})
	})
})
