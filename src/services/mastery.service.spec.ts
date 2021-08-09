import { HttpModule, HttpService } from '@nestjs/axios'
import { HttpStatus, Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AxiosResponse } from 'axios'
import { from } from 'rxjs'
import { toggleMockedLogger } from '../../test/utils'
import { ChampionMastery } from '../models/champion-mastery.model'
import { AppService } from './app.service'
import { MasteryService } from './mastery.service'

type TestCase_GetMasteryTotal = {
	description: string
	expectedCountGet: number
	expectedResult: number
	mockHttpGet: jest.Mock
	// mockLoadUsersFromFile: jest.Mock
	paramSummonerId: string
	paramDefaultMasteryTotal: number | undefined
}
// type TestCase_RefreshMasteryTotalForAllUsers = {
// 	description: string
// 	descriptionParams: string
// 	expectedCountGet: number
// 	expectedResult: User[]
// 	mockHttpGet: jest.Mock
// 	mockLoadUsersFromFile: jest.Mock
// 	mockUpdateUsersFile: jest.Mock
// 	param1: string
// }

describe('Mastery Service', () => {
	const fakeAPIKey = 'some-api-key'
	const fakeSummonerId = 'some-summoner-id'

	const testCases_getMasteryTotal: TestCase_GetMasteryTotal[] = [
		{
			description: 'empty array of Users',
			expectedCountGet: 1,
			expectedResult: -1, // comes from DEFAULT_TOTAL_MASTERY_SCORE
			mockHttpGet: jest.fn().mockReturnValue(
				from(
					Promise.resolve({
						data: -1,
						status: HttpStatus.OK,
					} as AxiosResponse<number>),
				),
			),
			// mockLoadUsersFromFile: jest.fn(() => []),
			paramSummonerId: '',
			paramDefaultMasteryTotal: undefined,
		},
		// {
		// 	description: 'array of single User',
		// 	expectedCountGet: 0,
		// 	expectedResult: -1, // comes from DEFAULT_TOTAL_MASTERY_SCORE
		// 	mockHttpGet: jest.fn(() => Promise.resolve()),
		// 	// mockLoadUsersFromFile: jest.fn(() => [
		// 	// 	new User('acct-1', new Date().getTime(), 75, 'name-1', 'summ-1'),
		// 	// ]),
		// 	paramSummonerId: '',
		// 	paramDefaultMasteryTotal: undefined,
		// },
		// {
		// 	description: 'array of single User where isFresh === true',
		// 	expectedCountGet: 0,
		// 	expectedResult: 75, // comes from fresh User
		// 	mockHttpGet: jest.fn(() => Promise.resolve()),
		// 	// mockLoadUsersFromFile: jest.fn(() => [
		// 	// 	new User('acct-1', new Date().getTime(), 75, 'name-1', 'summ-1'),
		// 	// ]),
		// 	paramSummonerId: 'summ-1',
		// 	paramDefaultMasteryTotal: undefined,
		// },
		{
			description: 'array of single User where isFresh !== true',
			expectedCountGet: 1,
			expectedResult: 113, // comes from http INSTEAD of User
			mockHttpGet: jest.fn().mockReturnValue(
				from(
					Promise.resolve({
						data: 113,
						status: HttpStatus.OK,
					} as AxiosResponse<number>),
				),
			),
			// mockLoadUsersFromFile: jest.fn(() => [
			// 	new User(
			// 		'acct-1',
			// 		new Date(2020, 1, 1).getTime(),
			// 		75,
			// 		'name-1',
			// 		'summ-1',
			// 	),
			// ]),
			paramSummonerId: 'summ-1',
			paramDefaultMasteryTotal: undefined,
		},
		{
			description:
				'array of single User where isFresh !== true but HTTP GET rejects',
			expectedCountGet: 1,
			expectedResult: 5, // comes from param3
			mockHttpGet: jest
				.fn()
				.mockReturnValue(
					from(Promise.reject(new Error('Fake ajw error'))),
				),
			// mockLoadUsersFromFile: jest.fn(() => [
			// 	new User(
			// 		'acct-1',
			// 		new Date(2020, 1, 1).getTime(),
			// 		75,
			// 		'name-1',
			// 		'summ-1',
			// 	),
			// ]),
			paramSummonerId: 'summ-1',
			paramDefaultMasteryTotal: 5,
		},
	]
	/*
	const testCases_refreshMasteryTotalForAllUsers: TestCase_RefreshMasteryTotalForAllUsers[] =
		[
			{
				description: 'empty Users array',
				descriptionParams: 'empty apiKey',
				expectedCountGet: 0,
				expectedResult: [],
				mockHttpGet: jest.fn(),
				mockLoadUsersFromFile: jest.fn(() => []),
				mockUpdateUsersFile: jest.fn(),
				param1: '',
			},
			{
				description:
					'empty Users array, mocked updateUsersFile throws error',
				descriptionParams: 'empty apiKey',
				expectedCountGet: 0,
				expectedResult: [],
				mockHttpGet: jest.fn(),
				mockLoadUsersFromFile: jest.fn(() => []),
				mockUpdateUsersFile: jest.fn(() => {
					throw new Error('fake AJW error')
				}),
				param1: '',
			},
			{
				description:
					'non-empty Users array, mocked updateUsersFile, mocked HttpGet returns updated value',
				descriptionParams: 'empty apiKey',
				expectedCountGet: 1,
				expectedResult: [
					new User(
						'acct-1',
						new Date(2020, 1, 1).getTime(),
						134,
						'name-1',
						'summ-1',
					),
				],
				mockHttpGet: jest.fn(() => from(Promise.resolve({ data: '134' }))),
				mockLoadUsersFromFile: jest.fn(() => [
					new User(
						'acct-1',
						new Date(2020, 1, 1).getTime(),
						123,
						'name-1',
						'summ-1',
					),
				]),
				mockUpdateUsersFile: jest.fn(),
				param1: '',
			},
		]
	*/
	let service: MasteryService
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
				MasteryService,
				Logger,
			],
		}).compile()

		service = testModule.get(MasteryService)
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

		describe('invoke getAllChampionMasteries()', () => {
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
			let mockHttpGet: jest.Mock
			let resp: ChampionMastery[]

			beforeEach(async () => {
				mockHttpGet = jest.fn().mockReturnValue(
					from(
						Promise.resolve({
							data: fakeChampionMasteries,
							status: HttpStatus.OK,
						} as AxiosResponse<ChampionMastery[]>),
					),
				)

				jest.spyOn(
					testModule.get(HttpService),
					'get',
				).mockImplementation(mockHttpGet)

				resp = await service.getAllChampionMasteries(fakeSummonerId)
			})

			it('invokes httpService.get() properly and returns expected data w/o error', () => {
				expect(mockGetRiotToken).toHaveBeenCalledTimes(1)

				expect(mockHttpGet).toHaveBeenCalledTimes(1)
				expect(mockHttpGet).toHaveBeenLastCalledWith(
					`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${fakeSummonerId}`,
					{
						headers: {
							'Accept-Charset':
								'application/x-www-form-urlencoded; charset=UTF-8',
							'Accept-Language': 'en-US,en;q=0.9',
							'X-Riot-Token': fakeAPIKey,
						},
					},
				)

				expect(resp).toEqual(fakeChampionMasteries)
			})
		})

		testCases_getMasteryTotal.forEach(
			({
				description,
				expectedCountGet,
				expectedResult,
				mockHttpGet,
				// mockLoadUsersFromFile,
				paramSummonerId,
				paramDefaultMasteryTotal,
			}) => {
				describe(`w/ mocked loadUsersFromFile (${description})`, () => {
					beforeEach(() => {
						// jest
						// 	.spyOn(testModule.get(UserService), 'loadUsersFromFile')
						// 	.mockImplementation(mockLoadUsersFromFile)
						jest.spyOn(
							testModule.get(HttpService),
							'get',
						).mockImplementation(mockHttpGet)
					})

					afterEach(() => {
						// jest
						// 	.spyOn(testModule.get(UserService), 'loadUsersFromFile')
						// 	.mockRestore()
						jest.spyOn(
							testModule.get(HttpService),
							'get',
						).mockRestore()
					})

					describe(`invoke getMasteryTotal("${paramSummonerId}", ${paramDefaultMasteryTotal})`, () => {
						let actualResult: number

						beforeEach(async () => {
							actualResult = await service.getMasteryTotal(
								paramSummonerId,
								paramDefaultMasteryTotal,
							)
						})

						it('uses AppService for riotToken, invokes get() correctly and returns expected result', () => {
							expect(mockGetRiotToken).toHaveBeenCalledTimes(1)
							// expect(mockLoadUsersFromFile).toHaveBeenCalledTimes(1)

							expect(mockHttpGet).toHaveBeenCalledTimes(
								expectedCountGet,
							)
							if (expectedCountGet > 0) {
								expect(mockHttpGet).toHaveBeenLastCalledWith(
									`https://na1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${paramSummonerId}`,
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

		/*
		testCases_refreshMasteryTotalForAllUsers.forEach(
			({
				description,
				descriptionParams,
				expectedCountGet,
				expectedResult,
				mockHttpGet,
				mockLoadUsersFromFile,
				mockUpdateUsersFile,
				param1,
			}) => {
				describe(`w/ mocked HttpGet, updateUsersFile, loadUsersFromFile (${description})`, () => {
					beforeEach(() => {
						jest
							.spyOn(testModule.get(UserService), 'loadUsersFromFile')
							.mockImplementation(mockLoadUsersFromFile)
						jest
							.spyOn(testModule.get(UserService), 'updateUsersFile')
							.mockImplementation(mockUpdateUsersFile)
						jest
							.spyOn(testModule.get(HttpService), 'get')
							.mockImplementation(mockHttpGet)
					})

					afterEach(() => {
						jest
							.spyOn(testModule.get(UserService), 'loadUsersFromFile')
							.mockRestore()
						jest
							.spyOn(testModule.get(UserService), 'updateUsersFile')
							.mockRestore()
						jest.spyOn(testModule.get(HttpService), 'get').mockRestore()
					})

					describe(`invoke refreshMasteryTotalForAllUsers("${param1}") [${descriptionParams}]`, () => {
						let actualResult: User[]

						beforeEach(async () => {
							actualResult = await service.refreshMasteryTotalForAllUsers(
								param1,
							)
						})

						it('invokes loadUsersFromFile(), updateUsersFile(), get() correctly and returns expected result', () => {
							expect(mockHttpGet).toHaveBeenCalledTimes(expectedCountGet)
							expect(mockLoadUsersFromFile).toHaveBeenCalledTimes(1)
							expect(mockUpdateUsersFile).toHaveBeenCalledTimes(1)

							actualResult.forEach((user, ind) => {
								const expectedUser = expectedResult[ind]

								expect(user).toMatchObject({
									accountId: expectedUser.accountId,
									masteryTotal: expectedUser.masteryTotal,
									name: expectedUser.name,
									summonerId: expectedUser.summonerId,
								} as User)
							})
						})
					})
				})
			},
		)
		*/
	})
})
