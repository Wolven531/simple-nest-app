import { HttpModule, HttpService, Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { from } from 'rxjs'
import { toggleMockedLogger } from '../../test/utils'
import { Game } from '../models/game.model'
import { Match } from '../models/match.model'
import { Matchlist } from '../models/matchlist.model'
import { AppService } from './app.service'
import { MatchlistService } from './matchlist.service'

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
	expectedUrlParam: number
	expectedResult: Match[] | Game[]
	mockGetGame: jest.Mock
	mockHttpGet: jest.Mock
	paramAccountId: string
	paramGetLastX: number | undefined
	paramIncludeGameData: boolean | undefined
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
			expectedUrlParam: 10,
			expectedResult: [],
			mockGetGame: jest.fn(() => Promise.resolve()),
			mockHttpGet: jest.fn(() =>
				from(Promise.reject(new Error('Fake ajw error'))),
			),
			paramAccountId: 'some-account-id',
			paramGetLastX: undefined,
			paramIncludeGameData: undefined,
		},
		{
			description: 'Returned data is bad',
			expectedCountHttpGet: 1,
			expectedCountGetGame: 0,
			expectedUrlParam: 10,
			expectedResult: [],
			mockGetGame: jest.fn(() => Promise.resolve()),
			mockHttpGet: jest.fn(() => from(Promise.resolve({}))),
			paramAccountId: 'some-account-id',
			paramGetLastX: undefined,
			paramIncludeGameData: undefined,
		},
		{
			description: 'Returned data is good',
			expectedCountHttpGet: 1,
			expectedCountGetGame: 0,
			expectedUrlParam: 10,
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
			paramAccountId: 'some-account-id',
			paramGetLastX: undefined,
			paramIncludeGameData: undefined,
		},
		{
			description: 'Returned data is good',
			expectedCountHttpGet: 1,
			expectedCountGetGame: 0,
			expectedUrlParam: 1,
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
			paramAccountId: 'some-account-id',
			paramGetLastX: 0,
			paramIncludeGameData: undefined,
		},
		{
			description: 'Returned data is good',
			expectedCountHttpGet: 1,
			expectedCountGetGame: 0,
			expectedUrlParam: 100,
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
			paramAccountId: 'some-account-id',
			paramGetLastX: 101,
			paramIncludeGameData: undefined,
		},
		{
			description: 'Returned data is good',
			expectedCountHttpGet: 1,
			expectedCountGetGame: 1,
			expectedUrlParam: 1,
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
			paramAccountId: 'some-account-id',
			paramGetLastX: 1,
			paramIncludeGameData: true,
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
				description,
				expectedCountHttpGet,
				expectedResult,
				mockHttpGet,
				paramGameId,
			}) => {
				describe(`w/ mocked HttpGet (${description})`, () => {
					beforeEach(() => {
						jest
							.spyOn(testModule.get(HttpService), 'get')
							.mockImplementation(mockHttpGet)
					})

					describe(`invoke getGame(${paramGameId})`, () => {
						let actualResult: Game | null

						beforeEach(async () => {
							actualResult = await service.v4GetGame(paramGameId)
						})

						it('uses AppService for riotToken, invokes get() correctly and returns expected result', () => {
							expect(mockGetRiotToken).toHaveBeenCalledTimes(1)

							expect(mockHttpGet).toHaveBeenCalledTimes(expectedCountHttpGet)
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
				expectedUrlParam,
				expectedResult,
				mockGetGame,
				mockHttpGet,
				paramAccountId,
				paramGetLastX,
				paramIncludeGameData,
			}) => {
				describe(`w/ mocked HttpGet and v4GetGame (${description})`, () => {
					beforeEach(() => {
						jest.spyOn(service, 'v4GetGame').mockImplementation(mockGetGame)
						jest
							.spyOn(testModule.get(HttpService), 'get')
							.mockImplementation(mockHttpGet)
					})

					describe(`invoke getMatchlist("${paramAccountId}", ${paramGetLastX}, ${paramIncludeGameData})`, () => {
						let actualResult: Game[] | Match[]

						beforeEach(async () => {
							actualResult = await service.v4GetMatchlist(
								paramAccountId,
								paramGetLastX,
								paramIncludeGameData,
							)
						})

						it('uses AppService for riotToken, invokes get() correctly and returns expected result', () => {
							expect(mockGetRiotToken).toHaveBeenCalledTimes(1)

							expect(mockHttpGet).toHaveBeenCalledTimes(expectedCountHttpGet)
							if (expectedCountHttpGet > 0) {
								expect(mockHttpGet).toHaveBeenLastCalledWith(
									`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${paramAccountId}?endIndex=${expectedUrlParam}`,
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
							expect(mockGetGame).toHaveBeenCalledTimes(expectedCountGetGame)

							expect(actualResult).toEqual(expectedResult)
						})
					})
				})
			},
		)
	})
})
