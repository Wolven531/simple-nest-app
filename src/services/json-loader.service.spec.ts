import { User } from '../models/user.model'
import { HttpModule, Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import fs from 'fs'
import { toggleMockedLogger } from '../../test/utils'
import { ENCODING_UTF8 } from '../constants'
import { JsonLoaderService } from './json-loader.service'

type TestCase_GetUserByFriendlyName = {
	expectedResult: User | undefined
	mockLoadUsersFromFile: jest.Mock
	name: string
	param: string
}
// type TestCase_IsFileFresh = {
// 	expectedCountError: number
// 	expectedResult: boolean
// 	mockLoadUsersFromFile: jest.Mock
// 	name: string
// }
type TestCase_LoadFromFile = {
	expectedCountError: number
	expectedResult: User[]
	mockReadFileSync: jest.Mock
	name: string
}
// type TestCase_UpdateUsersFile = {
// 	expectedCountError: number
// 	mockWriteFileSync: jest.Mock
// 	name: string
// 	param: User[]
// }

describe('JSON Loader Service', () => {
	const testCases_GetUserByFriendlyName: TestCase_GetUserByFriendlyName[] = [
		{
			expectedResult: undefined,
			mockLoadUsersFromFile: jest.fn(() => []),
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
			mockLoadUsersFromFile: jest.fn(() => [
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
			]),
			name: 'when multiple users, one name matches exactly',
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
			mockLoadUsersFromFile: jest.fn(() => [
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
			]),
			name: 'when multiple users, one name matches w/ different casing',
			param: 'nAmE 1',
		},
		{
			expectedResult: undefined,
			mockLoadUsersFromFile: jest.fn(() => [
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
			]),
			name: 'when multiple users, none match',
			param: 'non-matching name',
		},
	]
	// const testCases_IsFileFresh: TestCase_IsFileFresh[] = [
	// 	{
	// 		expectedCountError: 0,
	// 		expectedResult: true,
	// 		mockLoadUsersFromFile: jest.fn(() => []),
	// 		name: 'when no users',
	// 	},
	// 	{
	// 		expectedCountError: 0,
	// 		expectedResult: true,
	// 		mockLoadUsersFromFile: jest.fn(() => [
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
	// 		]),
	// 		name: 'when multiple users, all fresh',
	// 	},
	// 	{
	// 		expectedCountError: 0,
	// 		expectedResult: false,
	// 		mockLoadUsersFromFile: jest.fn(() => [
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
	// 		]),
	// 		name: 'when multiple users, one is stale',
	// 	},
	// ]
	const testCases_LoadFromFile: TestCase_LoadFromFile[] = [
		{
			expectedCountError: 0,
			expectedResult: [],
			mockReadFileSync: jest.fn(() =>
				Buffer.from(JSON.stringify([]), ENCODING_UTF8),
			),
			name: 'empty array',
		},
		{
			expectedCountError: 0,
			expectedResult: [
				new User('account-id-1', 1599444327317, 9, 'name 1', 'summ-id-1'),
			],
			mockReadFileSync: jest.fn(() =>
				Buffer.from(
					JSON.stringify([
						new User('account-id-1', 1599444327317, 9, 'name 1', 'summ-id-1'),
					]),
					ENCODING_UTF8,
				),
			),
			name: 'non-empty array',
		},
		{
			expectedCountError: 1,
			expectedResult: [],
			mockReadFileSync: jest.fn(() => {
				throw new Error('fake ajw err')
			}),
			name: 'throws error',
		},
	]
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

	let service: JsonLoaderService
	let testModule: TestingModule

	beforeEach(async () => {
		testModule = await Test.createTestingModule({
			controllers: [],
			imports: [HttpModule],
			providers: [JsonLoaderService, Logger],
		}).compile()

		service = testModule.get(JsonLoaderService)
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

		testCases_GetUserByFriendlyName.forEach(
			({ expectedResult, mockLoadUsersFromFile, name, param }) => {
				describe(`w/ mocked loadUsersFromFile (${name})`, () => {
					beforeEach(() => {
						jest
							.spyOn(service, 'loadUsersFromFile')
							.mockImplementation(mockLoadUsersFromFile)
					})

					afterEach(() => {
						jest.spyOn(service, 'loadUsersFromFile').mockRestore()
					})

					describe(`invoke getUserByFriendlyName("${param}")`, () => {
						let actualResult: User | undefined

						beforeEach(() => {
							actualResult = service.getUserByFriendlyName(param)
						})

						it('invokes loadUsersFromFile, log, error correctly and returns expected result', () => {
							expect(mockLoadUsersFromFile).toHaveBeenCalledTimes(1)
							expect(actualResult).toEqual(expectedResult)
						})
					})
				})
			},
		)

		// testCases_IsFileFresh.forEach(
		// 	({ expectedResult, mockLoadUsersFromFile, name }) => {
		// 		describe(`w/ mocked loadUsersFromFile (${name})`, () => {
		// 			beforeEach(() => {
		// 				jest
		// 					.spyOn(service, 'loadUsersFromFile')
		// 					.mockImplementation(mockLoadUsersFromFile)
		// 			})

		// 			afterEach(() => {
		// 				jest.spyOn(service, 'loadUsersFromFile').mockRestore()
		// 			})

		// 			describe('invoke isUsersFileFresh()', () => {
		// 				let actualResult: boolean

		// 				beforeEach(() => {
		// 					actualResult = service.isUsersFileFresh()
		// 				})

		// 				it('invokes loadUsersFromFile, log, error correctly and returns expected result', () => {
		// 					expect(mockLoadUsersFromFile).toHaveBeenCalledTimes(1)
		// 					expect(actualResult).toEqual(expectedResult)
		// 				})
		// 			})
		// 		})
		// 	},
		// )

		testCases_LoadFromFile.forEach(
			({ expectedResult, mockReadFileSync, name }) => {
				describe(`w/ mocked fs.readFileSync (${name})`, () => {
					beforeEach(() => {
						jest.spyOn(fs, 'readFileSync').mockImplementation(mockReadFileSync)
					})

					afterEach(() => {
						jest.spyOn(fs, 'readFileSync').mockRestore()
					})

					describe('invoke loadUsersFromFile()', () => {
						let actualResult: User[]

						beforeEach(() => {
							actualResult = service.loadUsersFromFile()
						})

						it('invokes read, log, error correctly and returns expected result', () => {
							expect(mockReadFileSync).toHaveBeenCalledTimes(1)
							expect(actualResult).toEqual(expectedResult)
						})
					})
				})
			},
		)

		// testCases_UpdateUsersFile.forEach(({ mockWriteFileSync, name, param }) => {
		// 	describe(`w/ mocked fs.writeFileSync (${name})`, () => {
		// 		beforeEach(() => {
		// 			jest.spyOn(fs, 'writeFileSync').mockImplementation(mockWriteFileSync)
		// 		})

		// 		afterEach(() => {
		// 			jest.spyOn(fs, 'writeFileSync').mockRestore()
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
