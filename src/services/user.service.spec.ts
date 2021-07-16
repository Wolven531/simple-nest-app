import { User } from '../models/user.model'
import { Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { UserService } from './user.service'

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
				new Date(1990, 11, 15).getTime(),
				9,
				'name 1',
				'summ-id-1',
			),
			mockLoadedUsers: [
				new User(
					'account-id-1',
					new Date(1990, 11, 15).getTime(),
					9,
					'name 1',
					'summ-id-1',
				),
				new User(
					'account-id-2',
					new Date().getTime(),
					12,
					'name 2',
					'summ-id-2',
				),
			],
			name: 'multiple users, one name matches exactly',
			param: 'name 1',
		},
		{
			expectedResult: new User(
				'account-id-1',
				new Date(1990, 11, 15).getTime(),
				9,
				'name 1',
				'summ-id-1',
			),
			mockLoadedUsers: [
				new User(
					'account-id-1',
					new Date(1990, 11, 15).getTime(),
					9,
					'name 1',
					'summ-id-1',
				),
				new User(
					'account-id-2',
					new Date().getTime(),
					12,
					'name 2',
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
					new Date().getTime(),
					9,
					'name 1',
					'summ-id-1',
				),
				new User(
					'account-id-2',
					new Date().getTime(),
					12,
					'name 2',
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
	// 				'summ-id-1',
	// 			),
	// 			new User(
	// 				'account-id-2',
	// 				new Date().getTime(),
	// 				12,
	// 				'name 2',
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
	// 				'summ-id-1',
	// 			),
	// 			new User(
	// 				'account-id-2',
	// 				new Date(1990, 11, 15).getTime(),
	// 				12,
	// 				'name 2',
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
	// 		new User('account-id-1', 1599444327317, 9, 'name 1', 'summ-id-1'),
	// 	],
	// 	// mockReadFileSync: jest.fn(() =>
	// 	// 	Buffer.from(
	// 	// 		JSON.stringify([
	// 	// 			new User('account-id-1', 1599444327317, 9, 'name 1', 'summ-id-1'),
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

	let service: UserService
	let testModule: TestingModule

	beforeEach(async () => {
		testModule = await Test.createTestingModule({
			controllers: [],
			imports: [],
			providers: [UserService, Logger],
		}).compile()

		service = testModule.get(UserService)
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
			const fakeUser: User = {
				accountId: 'account-id',
				lastUpdated: new Date(2021, 7, 1).getTime(),
				masteryTotal: 1,
				name: 'name 1',
				summonerId: 'summ-id',
			} as User

			beforeEach(() => {
				jest
					.spyOn(service as any, 'loadUsersFromFile')
					.mockImplementation(() => jest.fn().mockReturnValue([]))

				service.addUser(fakeUser)
			})

			afterEach(() => {
				jest.spyOn(service as any, 'loadUsersFromFile').mockRestore()
			})

			it('adds user to collection of users in service', () => {
				expect(service.users).toContain(fakeUser)
			})
		})

		testCases_GetUserByFriendlyName.forEach(
			({ expectedResult, mockLoadedUsers, name, param }) => {
				describe(`w/ mockLoadedUsers (${name})`, () => {
					beforeEach(() => {
						jest
							.spyOn(service as any, 'users', 'get')
							.mockReturnValue(mockLoadedUsers)

						// TODO - not sure why below does not work...
						// jest
						// 	.spyOn(service as any, 'loadUsersFromFile')
						// 	.mockReturnValue(mockLoadedUsers)
					})

					afterEach(() => {
						jest.spyOn(service as any, 'loadUsersFromFile').mockRestore()
					})

					describe(`invoke getUserByFriendlyName("${param}")`, () => {
						let actualResult: User | undefined

						beforeEach(() => {
							actualResult = service.getUserByFriendlyName(param)
						})

						it('invokes log, error correctly and returns expected result', () => {
							expect(actualResult).toEqual(expectedResult)
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
