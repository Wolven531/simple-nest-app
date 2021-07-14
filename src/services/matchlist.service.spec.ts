import { Game } from '../models/game.model'
import { Match } from '../models/match.model'
import { Matchlist } from '../models/matchlist.model'
import { HttpModule, HttpService, Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { from } from 'rxjs'
import { toggleMockedLogger } from '../../test/utils'
import { MatchlistService } from './matchlist.service'
import { AppService } from './app.service'

type TestCase_GetGame = {
	descriptionMockedBehavior: string
	expectedCountGet: number
	expectedResult: Game | null
	mockHttpGet: jest.Mock
	param1: number
}
type TestCase_GetMatchlist = {
	descriptionMockedBehavior: string
	expectedCountGet: number
	expectedCountGetGame: number
	expectedResult: Match[] | Game[]
	mockGetGame: jest.Mock
	mockHttpGet: jest.Mock
	param1: string
	param2: number | undefined
	param3: boolean | undefined
}

describe('Matchlist Service', () => {
	const fakeAPIKey = 'some-api-key'

	const testCases_getGame: TestCase_GetGame[] = [
		{
			descriptionMockedBehavior: 'Http error occurs',
			expectedCountGet: 1,
			expectedResult: null,
			mockHttpGet: jest.fn(() =>
				from(Promise.reject(new Error('Fake ajw error'))),
			),
			param1: 0,
		},
		{
			descriptionMockedBehavior: 'Returned data is bad',
			expectedCountGet: 1,
			expectedResult: null,
			mockHttpGet: jest.fn(() => from(Promise.resolve({}))),
			param1: 0,
		},
		{
			descriptionMockedBehavior: 'Returned data is good',
			expectedCountGet: 1,
			expectedResult: { gameCreation: 333, gameDuration: 444 } as Game,
			mockHttpGet: jest.fn(() =>
				from(
					Promise.resolve({
						data: { gameCreation: 333, gameDuration: 444 } as Game,
					}),
				),
			),
			param1: 0,
		},
	]
	const testCases_getMatchlist: TestCase_GetMatchlist[] = [
		{
			descriptionMockedBehavior: 'Http error occurs',
			expectedCountGet: 1,
			expectedCountGetGame: 0,
			expectedResult: [],
			mockGetGame: jest.fn(() => Promise.resolve()),
			mockHttpGet: jest.fn(() =>
				from(Promise.reject(new Error('Fake ajw error'))),
			),
			param1: '',
			param2: undefined,
			param3: undefined,
		},
		{
			descriptionMockedBehavior: 'Returned data is bad',
			expectedCountGet: 1,
			expectedCountGetGame: 0,
			expectedResult: [],
			mockGetGame: jest.fn(() => Promise.resolve()),
			mockHttpGet: jest.fn(() => from(Promise.resolve({}))),
			param1: '',
			param2: undefined,
			param3: undefined,
		},
		{
			descriptionMockedBehavior: 'Returned data is good',
			expectedCountGet: 1,
			expectedCountGetGame: 0,
			expectedResult: [
				new Match(
					222,
					'NONE',
					2020,
					'NA1',
					100,
					1,
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
									1,
									'NONE',
									new Date(2020, 1, 1).getTime(),
								),
							] as Match[],
							totalGames: 1,
						} as Matchlist,
					}),
				),
			),
			param1: '',
			param2: undefined,
			param3: undefined,
		},
		{
			descriptionMockedBehavior: 'Returned data is good',
			expectedCountGet: 1,
			expectedCountGetGame: 0,
			expectedResult: [],
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
									1,
									'NONE',
									new Date(2020, 1, 1).getTime(),
								),
							] as Match[],
							totalGames: 1,
						} as Matchlist,
					}),
				),
			),
			param1: '',
			param2: 0,
			param3: undefined,
		},
		{
			descriptionMockedBehavior: 'Returned data is good',
			expectedCountGet: 1,
			expectedCountGetGame: 0,
			expectedResult: [
				new Match(
					222,
					'NONE',
					2020,
					'NA1',
					100,
					1,
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
									1,
									'NONE',
									new Date(2020, 1, 1).getTime(),
								),
							] as Match[],
							totalGames: 1,
						} as Matchlist,
					}),
				),
			),
			param1: '',
			param2: 101,
			param3: undefined,
		},
		{
			descriptionMockedBehavior: 'Returned data is good',
			expectedCountGet: 1,
			expectedCountGetGame: 1,
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
					1,
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
						1,
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
									1,
									'NONE',
									new Date(2020, 1, 1).getTime(),
								),
							] as Match[],
							totalGames: 1,
						} as Matchlist,
					}),
				),
			),
			param1: '',
			param2: 1,
			param3: true,
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
		beforeEach(() => {
			toggleMockedLogger(testModule)
		})

		afterEach(() => {
			toggleMockedLogger(testModule, false)
		})

		testCases_getGame.forEach(
			({
				descriptionMockedBehavior,
				expectedCountGet,
				expectedResult,
				mockHttpGet,
				param1,
			}) => {
				describe(`w/ mocked HttpGet (${descriptionMockedBehavior})`, () => {
					beforeEach(() => {
						jest
							.spyOn(testModule.get(HttpService), 'get')
							.mockImplementation(mockHttpGet)
					})

					afterEach(() => {
						jest.spyOn(testModule.get(HttpService), 'get').mockRestore()
					})

					describe(`invoke getGame("${param1}")`, () => {
						let actualResult: Game | null

						beforeEach(async () => {
							actualResult = await service.getGame(param1)
						})

						it('uses AppService for riotToken, invokes get() correctly and returns expected result', () => {
							expect(mockGetRiotToken).toHaveBeenCalledTimes(1)

							expect(mockHttpGet).toHaveBeenCalledTimes(expectedCountGet)
							if (expectedCountGet > 0) {
								expect(mockHttpGet).toHaveBeenLastCalledWith(
									'https://na1.api.riotgames.com/lol/match/v4/matches/0',
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
				descriptionMockedBehavior,
				expectedCountGet,
				expectedCountGetGame,
				expectedResult,
				mockGetGame,
				mockHttpGet,
				param1,
				param2,
				param3,
			}) => {
				describe(`w/ mocked HttpGet (${descriptionMockedBehavior})`, () => {
					beforeEach(() => {
						jest.spyOn(service, 'getGame').mockImplementation(mockGetGame)
						jest
							.spyOn(testModule.get(HttpService), 'get')
							.mockImplementation(mockHttpGet)
					})

					afterEach(() => {
						jest.spyOn(service, 'getGame').mockRestore()
						jest.spyOn(testModule.get(HttpService), 'get').mockRestore()
					})

					describe(`invoke getMatchlist("${param1}", "${param2}", "${param3}")`, () => {
						let actualResult: Game[] | Match[]

						beforeEach(async () => {
							actualResult = await service.getMatchlist(param1, param2, param3)
						})

						it('uses AppService for riotToken, invokes get() correctly and returns expected result', () => {
							expect(mockGetRiotToken).toHaveBeenCalledTimes(1)

							expect(mockHttpGet).toHaveBeenCalledTimes(expectedCountGet)
							expect(mockGetGame).toHaveBeenCalledTimes(expectedCountGetGame)

							expect(actualResult).toEqual(expectedResult)
						})
					})
				})
			},
		)
	})
})
