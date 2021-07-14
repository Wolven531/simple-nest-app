import { HttpModule, Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { Game } from '../models/game.model'
import { Match } from '../models/match.model'
import { MatchlistService } from '../services/matchlist.service'
import { MatchlistController } from './matchlist.controller'

describe('MatchlistController', () => {
	const fakeGame: Game = {} as Game
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
							getGame: mockGetGame,
							getMatchlist: mockGetMatchlist,
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
			let resp: Match[]

			beforeEach(async () => {
				resp = (await controller.getMatchlist(
					'some-account-id',
					undefined,
					undefined,
				)) as Match[]
			})

			it('returns empty array', () => {
				expect(mockGetMatchlist).toHaveBeenCalledTimes(1)
				expect(resp).toEqual([])
			})
		})

		describe('invoke getGame()', () => {
			let resp: Game

			beforeEach(async () => {
				resp = await controller.getGame(0)
			})

			it('returns empty array', () => {
				expect(mockGetGame).toHaveBeenCalledTimes(1)
				expect(resp).toEqual(fakeGame)
			})
		})
	})
})
