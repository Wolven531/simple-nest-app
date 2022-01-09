import { HttpModule, HttpService } from '@nestjs/axios'
import { HttpStatus, Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { from, Observable } from 'rxjs'
import { toggleMockedLogger } from '../../test/utils'
import { User } from '../models/user.model'
import { AppService } from '../services/app.service'
import { UserService } from './user.service'
import { AxiosResponse } from '@nestjs/common/node_modules/axios'
import { REGION } from '../constants'
import { Summoner } from '../models/summoner.model'

type TestCase_GetUserByFriendlyName = {
	expectedResult: User | undefined
	mockLoadedUsers: User[]
	name: string
	param: string
}
// type TestCase_IsFileFresh = {
// 	expectedCountError: number
// 	expectedResult: boolean
// 	mockLoadedUsers: User[]
// 	name: string
// }
// type TestCase_LoadFromFile = {
// 	expectedCountError: number
// 	expectedResult: User[]
// 	// mockReadFileSync: jest.Mock
// 	name: string
// }
// type TestCase_UpdateUsersFile = {
// 	expectedCountError: number
// 	mockWriteFileSync: jest.Mock
// 	name: string
// 	param: User[]
// }

describe('User Service', () => {
	const testCases_GetUserByFriendlyName: TestCase_GetUserByFriendlyName[] = [
		{
			expectedResult: undefined,
			mockLoadedUsers: [],
			name: 'when no users',
			param: 'any name',
		},
		{
			expectedResult: new User(
				'account-id-1',
				new Date(1990, 11, 15),
				9,
				'name 1',
				'puuid-1',
				'summ-id-1',
			),
			mockLoadedUsers: [
				new User(
					'account-id-1',
					new Date(1990, 11, 15),
					9,
					'name 1',
					'puuid-1',
					'summ-id-1',
				),
				new User(
					'account-id-2',
					new Date(),
					12,
					'name 2',
					'puuid-2',
					'summ-id-2',
				),
			],
			name: 'multiple users, one name matches exactly',
			param: 'name 1',
		},
		{
			expectedResult: new User(
				'account-id-1',
				new Date(1990, 11, 15),
				9,
				'name 1',
				'puuid-1',
				'summ-id-1',
			),
			mockLoadedUsers: [
				new User(
					'account-id-1',
					new Date(1990, 11, 15),
					9,
					'name 1',
					'puuid-1',
					'summ-id-1',
				),
				new User(
					'account-id-2',
					new Date(),
					12,
					'name 2',
					'puuid-2',
					'summ-id-2',
				),
			],
			name: 'multiple users, one name matches w/ different casing',
			param: 'nAmE 1',
		},
		{
			expectedResult: undefined,
			mockLoadedUsers: [
				new User(
					'account-id-1',
					new Date(),
					9,
					'name 1',
					'puuid-1',
					'summ-id-1',
				),
				new User(
					'account-id-2',
					new Date(),
					12,
					'name 2',
					'puuid-2',
					'summ-id-2',
				),
			],
			name: 'multiple users, none match',
			param: 'non-matching name',
		},
	]
	// const testCases_IsFileFresh: TestCase_IsFileFresh[] = [
	// 	{
	// 		expectedCountError: 0,
	// 		expectedResult: true,
	// 		mockLoadedUsers: [],
	// 		name: 'when no users',
	// 	},
	// 	{
	// 		expectedCountError: 0,
	// 		expectedResult: true,
	// 		mockLoadedUsers: [
	// 			new User(
	// 				'account-id-1',
	// 				new Date().getTime(),
	// 				9,
	// 				'name 1',
	// 				'puuid-1',
	// 				'summ-id-1',
	// 			),
	// 			new User(
	// 				'account-id-2',
	// 				new Date().getTime(),
	// 				12,
	// 				'name 2',
	// 				'puuid-2',,
	// 				'summ-id-2',
	// 			),
	// 		],
	// 		name: 'when multiple users, all fresh',
	// 	},
	// 	{
	// 		expectedCountError: 0,
	// 		expectedResult: false,
	// 		mockLoadedUsers: [
	// 			new User(
	// 				'account-id-1',
	// 				new Date().getTime(),
	// 				9,
	// 				'name 1',
	// 				'puuid-1',
	// 				'summ-id-1',
	// 			),
	// 			new User(
	// 				'account-id-2',
	// 				new Date(1990, 11, 15).getTime(),
	// 				12,
	// 				'name 2',
	// 				'puuid-2',
	// 				'summ-id-2',
	// 			),
	// 		],
	// 		name: 'when multiple users, one is stale',
	// 	},
	// ]
	// const testCases_LoadFromFile: TestCase_LoadFromFile[] = [
	// 	{
	// 		expectedCountError: 0,
	// 		expectedResult: [],
	// 		// mockReadFileSync: jest.fn(() =>
	// 		// 	Buffer.from(JSON.stringify([]), ENCODING_UTF8),
	// 		// ),
	// 		name: 'empty array',
	// 	},
	// {
	// 	expectedCountError: 0,
	// 	expectedResult: [
	// 		new User('account-id-1', 1599444327317, 9, 'name 1', 'puuid-1', 'summ-id-1'),
	// 	],
	// 	// mockReadFileSync: jest.fn(() =>
	// 	// 	Buffer.from(
	// 	// 		JSON.stringify([
	// 	// 			new User('account-id-1', 1599444327317, 9, 'name 1', 'puuid-1', 'summ-id-1'),
	// 	// 		]),
	// 	// 		ENCODING_UTF8,
	// 	// 	),
	// 	// ),
	// 	name: 'non-empty array',
	// },
	// {
	// 	expectedCountError: 1,
	// 	expectedResult: [],
	// 	// mockReadFileSync: jest.fn(() => {
	// 	// 	throw new Error('fake ajw err')
	// 	// }),
	// 	name: 'throws error',
	// },
	// ]
	// const testCases_UpdateUsersFile: TestCase_UpdateUsersFile[] = [
	// 	{
	// 		expectedCountError: 0,
	// 		mockWriteFileSync: jest.fn(),
	// 		name: 'w/ empty user array',
	// 		param: [],
	// 	},
	// 	{
	// 		expectedCountError: 1,
	// 		mockWriteFileSync: jest.fn(() => {
	// 			throw new Error('fake ajw err')
	// 		}),
	// 		name: 'w/ writeFileSync that throws error',
	// 		param: [],
	// 	},
	// ]

	const fakeServerDatetime = new Date(Date.now())
	const fakeUTC = new Date(
		fakeServerDatetime.getUTCFullYear(),
		fakeServerDatetime.getUTCMonth(),
		fakeServerDatetime.getUTCDate(),
		fakeServerDatetime.getUTCHours(),
		fakeServerDatetime.getUTCMinutes(),
		fakeServerDatetime.getUTCSeconds(),
	)

	const fakeAPIKey = 'some-api-key'
	const fakeUser: User = {
		accountId: 'account-id',
		isFresh: true,
		lastUpdated: new Date(2021, 7, 1),
		masteryTotal: 1,
		name: 'name 1',
		puuid: 'puuid-1',
		summonerId: 'summ-id',
	}
	const fakeSummoner: Summoner = {
		accountId: 'account-id-2',
		id: 'id2',
		name: 'Míyukí',
		profileIconId: 13,
		puuid: 'puuid-2',
		revisionDate: 1,
		summonerLevel: 1,
	}
	let service: UserService
	let testModule: TestingModule
	let mockGetRiotToken: jest.Mock
	let mockHttpServiceGet: jest.Mock

	beforeEach(async () => {
		mockGetRiotToken = jest.fn().mockReturnValue(fakeAPIKey)
		mockHttpServiceGet = jest.fn(
			() =>
				from(
					Promise.resolve({
						data: {
							...fakeSummoner,
							revisionDate: fakeUTC.getTime(),
						} as Summoner,
						status: HttpStatus.OK,
					}),
				) as Observable<AxiosResponse<Summoner>>,
		)

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
				UserService,
				Logger,
			],
		}).compile()

		service = testModule.get(UserService)

		jest.spyOn(testModule.get(HttpService), 'get').mockImplementation(
			mockHttpServiceGet,
		)
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

		describe('invoke addUser()', () => {
			let actualResult: User[]

			beforeEach(async () => {
				service.setup([])

				service.addUser(fakeUser)
				actualResult = await service.getUsers()
			})

			it('adds user to collection of users in service', () => {
				expect(actualResult).toContain(fakeUser)
			})
		})

		describe('invoke lookupSummonerByFriendlyName() w/ capitalized version of name', () => {
			let actualResult: Summoner | undefined

			beforeEach(async () => {
				actualResult = await service.lookupSummonerByFriendlyName(
					fakeSummoner.name.toUpperCase(),
				)
			})

			it('invokes http service get w/ proper endpoint + query params, returns correct User', () => {
				expect(mockHttpServiceGet).toHaveBeenCalledTimes(1)

				const urlPassed = mockHttpServiceGet.mock.calls[0][0]
				expect(urlPassed).toEqual(
					`https://${REGION}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
						fakeSummoner.name.toUpperCase(),
					)}`,
				)

				expect(actualResult).toEqual({
					...fakeSummoner,
					revisionDate: fakeUTC.getTime(),
				})
			})
		})

		testCases_GetUserByFriendlyName.forEach(
			({ expectedResult, mockLoadedUsers, name, param }) => {
				describe(`w/ mockLoadedUsers (${name})`, () => {
					beforeEach(() => {
						service.setup(mockLoadedUsers)
					})

					describe(`invoke getUserByFriendlyName("${param}")`, () => {
						let result: User | undefined

						beforeEach(async () => {
							result = await service.getUserByFriendlyName(param)
						})

						it('invokes log, error correctly and returns expected result', () => {
							expect(result).toEqual(expectedResult)
						})
					})
				})
			},
		)

		// testCases_IsFileFresh.forEach(
		// 	({ expectedResult, mockLoadedUsers, name }) => {
		// 		describe(`w/ mocked loadUsersFromFile (${name})`, () => {
		// 			beforeEach(() => {
		// 				jest
		// 					.spyOn(service, 'loadUsersFromFile')
		// 					.mockReturnValue(mockLoadedUsers)
		// 			})

		// 			describe('invoke isUsersFileFresh()', () => {
		// 				let actualResult: boolean

		// 				beforeEach(() => {
		// 					actualResult = service.isUsersFileFresh()
		// 				})

		// 				it('invokes loadUsersFromFile, log, error correctly and returns expected result', () => {
		// 					expect(mockLoadedUsers).toHaveBeenCalledTimes(1)
		// 					expect(actualResult).toEqual(expectedResult)
		// 				})
		// 			})
		// 		})
		// 	},
		// )

		// testCases_LoadFromFile.forEach(({ expectedResult, name }) => {
		// 	describe(`w/ mocked fs.readFileSync (${name})`, () => {
		// 		// beforeEach(() => {
		// 		// 	jest.spyOn(fs, 'readFileSync').mockImplementation(mockReadFileSync)
		// 		// })

		// 		// afterEach(() => {
		// 		// 	jest.spyOn(fs, 'readFileSync').mockRestore()
		// 		// })

		// 		describe('invoke loadUsersFromFile()', () => {
		// 			let actualResult: User[]

		// 			beforeEach(() => {
		// 				actualResult = service.loadUsersFromFile()
		// 			})

		// 			it('invokes read, log, error correctly and returns expected result', () => {
		// 				// expect(mockReadFileSync).toHaveBeenCalledTimes(1)
		// 				// expect(actualResult).toEqual(expectedResult)
		// 				expect(actualResult.length).toBeGreaterThan(0)
		// 			})
		// 		})
		// 	})
		// })

		// testCases_UpdateUsersFile.forEach(({ mockWriteFileSync, name, param }) => {
		// 	describe(`w/ mocked fs.writeFileSync (${name})`, () => {
		// 		beforeEach(() => {
		// 			jest.spyOn(fs, 'writeFileSync').mockImplementation(mockWriteFileSync)
		// 		})

		// 		describe(`invoke updateUsersFile(${param.length}-length user array)`, () => {
		// 			beforeEach(() => {
		// 				expect(() => {
		// 					service.updateUsersFile(param)
		// 				}).not.toThrow()
		// 			})

		// 			it('invokes fs.writeFileSync, log, error correctly and does not throw Error', () => {
		// 				expect(mockWriteFileSync).toHaveBeenCalledTimes(1)
		// 			})
		// 		})
		// 	})
		// })
	})
})
