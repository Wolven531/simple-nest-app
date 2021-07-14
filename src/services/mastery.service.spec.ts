// import { User } from '../models/user.model'
import { HttpModule, HttpService, Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { from } from 'rxjs'
import { toggleMockedLogger } from '../../test/utils'
import { AppService } from './app.service'
import { MasteryService } from './mastery.service'

type TestCase_GetMasteryTotal = {
	descriptionMockedBehavior: string
	descriptionParams: string
	expectedCountGet: number
	expectedResult: number
	mockHttpGet: jest.Mock
	// mockLoadUsersFromFile: jest.Mock
	param1: string
	param2: number | undefined
}
// type TestCase_RefreshMasteryTotalForAllUsers = {
// 	descriptionMockedBehavior: string
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

	const testCases_getMasteryTotal: TestCase_GetMasteryTotal[] = [
		{
			descriptionMockedBehavior: 'empty array of Users',
			descriptionParams: 'empty summonerId, undefined defaultMasteryTotal',
			expectedCountGet: 1,
			expectedResult: -1, // comes from DEFAULT_TOTAL_MASTERY_SCORE
			mockHttpGet: jest.fn(() => from(Promise.resolve({ data: -1 }))),
			// mockLoadUsersFromFile: jest.fn(() => []),
			param1: '',
			param2: undefined,
		},
		// {
		// 	descriptionMockedBehavior: 'array of single User',
		// 	descriptionParams:
		// 		'empty summonerId, undefined defaultMasteryTotal',
		// 	expectedCountGet: 0,
		// 	expectedResult: -1, // comes from DEFAULT_TOTAL_MASTERY_SCORE
		// 	mockHttpGet: jest.fn(() => Promise.resolve()),
		// 	// mockLoadUsersFromFile: jest.fn(() => [
		// 	// 	new User('acct-1', new Date().getTime(), 75, 'name-1', 'summ-1'),
		// 	// ]),
		// 	param1: '',
		// 	param2: undefined,
		// },
		// {
		// 	descriptionMockedBehavior: 'array of single User where isFresh === true',
		// 	descriptionParams:
		// 		'matching summonerId, undefined defaultMasteryTotal',
		// 	expectedCountGet: 0,
		// 	expectedResult: 75, // comes from fresh User
		// 	mockHttpGet: jest.fn(() => Promise.resolve()),
		// 	// mockLoadUsersFromFile: jest.fn(() => [
		// 	// 	new User('acct-1', new Date().getTime(), 75, 'name-1', 'summ-1'),
		// 	// ]),
		// 	param1: 'summ-1',
		// 	param2: undefined,
		// },
		{
			descriptionMockedBehavior: 'array of single User where isFresh !== true',
			descriptionParams: 'matching summonerId, undefined defaultMasteryTotal',
			expectedCountGet: 1,
			expectedResult: 113, // comes from http INSTEAD of User
			mockHttpGet: jest.fn(() => from(Promise.resolve({ data: '113' }))),
			// mockLoadUsersFromFile: jest.fn(() => [
			// 	new User(
			// 		'acct-1',
			// 		new Date(2020, 1, 1).getTime(),
			// 		75,
			// 		'name-1',
			// 		'summ-1',
			// 	),
			// ]),
			param1: 'summ-1',
			param2: undefined,
		},
		{
			descriptionMockedBehavior:
				'array of single User where isFresh !== true but HTTP GET rejects',
			descriptionParams: 'matching summonerId, undefined defaultMasteryTotal',
			expectedCountGet: 1,
			expectedResult: 5, // comes from param3
			mockHttpGet: jest.fn(() =>
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
			param1: 'summ-1',
			param2: 5,
		},
	]
	/*
	const testCases_refreshMasteryTotalForAllUsers: TestCase_RefreshMasteryTotalForAllUsers[] =
		[
			{
				descriptionMockedBehavior: 'empty Users array',
				descriptionParams: 'empty apiKey',
				expectedCountGet: 0,
				expectedResult: [],
				mockHttpGet: jest.fn(),
				mockLoadUsersFromFile: jest.fn(() => []),
				mockUpdateUsersFile: jest.fn(),
				param1: '',
			},
			{
				descriptionMockedBehavior:
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
				descriptionMockedBehavior:
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

		testCases_getMasteryTotal.forEach(
			({
				descriptionMockedBehavior,
				descriptionParams,
				expectedCountGet,
				expectedResult,
				mockHttpGet,
				// mockLoadUsersFromFile,
				param1,
				param2,
			}) => {
				describe(`w/ mocked loadUsersFromFile (${descriptionMockedBehavior})`, () => {
					beforeEach(() => {
						// jest
						// 	.spyOn(testModule.get(JsonLoaderService), 'loadUsersFromFile')
						// 	.mockImplementation(mockLoadUsersFromFile)
						jest
							.spyOn(testModule.get(HttpService), 'get')
							.mockImplementation(mockHttpGet)
					})

					afterEach(() => {
						// jest
						// 	.spyOn(testModule.get(JsonLoaderService), 'loadUsersFromFile')
						// 	.mockRestore()
						jest.spyOn(testModule.get(HttpService), 'get').mockRestore()
					})

					describe(`invoke getMasteryTotal("${param1}", ${param2}) [${descriptionParams}]`, () => {
						let actualResult: number

						beforeEach(async () => {
							actualResult = await service.getMasteryTotal(param1, param2)
						})

						it('uses AppService for riotToken, invokes get() correctly and returns expected result', () => {
							expect(mockGetRiotToken).toHaveBeenCalledTimes(1)
							// expect(mockLoadUsersFromFile).toHaveBeenCalledTimes(1)

							expect(mockHttpGet).toHaveBeenCalledTimes(expectedCountGet)
							if (expectedCountGet > 0) {
								expect(mockHttpGet).toHaveBeenLastCalledWith(
									`https://na1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${param1}`,
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
				descriptionMockedBehavior,
				descriptionParams,
				expectedCountGet,
				expectedResult,
				mockHttpGet,
				mockLoadUsersFromFile,
				mockUpdateUsersFile,
				param1,
			}) => {
				describe(`w/ mocked HttpGet, updateUsersFile, loadUsersFromFile (${descriptionMockedBehavior})`, () => {
					beforeEach(() => {
						jest
							.spyOn(testModule.get(JsonLoaderService), 'loadUsersFromFile')
							.mockImplementation(mockLoadUsersFromFile)
						jest
							.spyOn(testModule.get(JsonLoaderService), 'updateUsersFile')
							.mockImplementation(mockUpdateUsersFile)
						jest
							.spyOn(testModule.get(HttpService), 'get')
							.mockImplementation(mockHttpGet)
					})

					afterEach(() => {
						jest
							.spyOn(testModule.get(JsonLoaderService), 'loadUsersFromFile')
							.mockRestore()
						jest
							.spyOn(testModule.get(JsonLoaderService), 'updateUsersFile')
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
