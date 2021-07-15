// import { HttpModule, HttpService, HttpStatus, Logger } from '@nestjs/common'
import { HttpModule, Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
// import { AxiosResponse } from 'axios'
// import childProcess from 'child_process'
import { toggleMockedLogger } from '../../test/utils'
import { Summoner } from '../models/summoner.model'
import { JsonLoaderService } from '../services/json-loader.service'
import { SummonerService } from '../services/summoner.service'
import { UserController } from './user.controller'

describe('UserController', () => {
	let controller: UserController
	let testModule: TestingModule
	let summonerService: SummonerService

	beforeEach(async () => {
		testModule = await Test.createTestingModule({
			controllers: [UserController],
			imports: [HttpModule],
			providers: [
				{
					provide: JsonLoaderService,
					useFactory: () => ({
						getUserByFriendlyName: jest.fn(() => undefined),
						loadUsersFromFile: jest.fn(() => []),
					}),
				},
				{
					provide: SummonerService,
					useFactory: () => ({
						getBySummonerId: jest.fn().mockResolvedValue(undefined),
						searchByName: jest.fn().mockResolvedValue(undefined),
					}),
				},
				Logger,
			],
		}).compile()

		controller = testModule.get(UserController)
		summonerService = testModule.get(SummonerService)
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

		// describe('invoke refreshUserData()', () => {
		// 	let capturedError: Error
		// 	let mockExecFileSync: jest.Mock
		// 	let resp: string

		// 	beforeEach(async () => {
		// 		mockExecFileSync = jest.fn()

		// 		try {
		// 			jest
		// 				.spyOn(childProcess, 'execFileSync')
		// 				.mockImplementation(mockExecFileSync)

		// 			resp = await controller.refreshUserData()
		// 		} catch (err) {
		// 			capturedError = err
		// 		}
		// 	})

		// 	afterEach(() => {
		// 		jest.spyOn(childProcess, 'execFileSync').mockRestore()
		// 	})

		// 	it('invokes execFileSync(), does NOT throw error', () => {
		// 		expect(mockExecFileSync).toHaveBeenCalledTimes(1)
		// 		expect(capturedError).toBeUndefined()
		// 		expect(resp).toBe('OK')
		// 	})
		// })

		// describe('invoke getUsers()', () => {
		// 	let capturedError: Error
		// 	let mockLoadUsersFromFile: jest.Mock
		// 	let resp: User[]

		// 	beforeEach(async () => {
		// 		mockLoadUsersFromFile = jest.fn(() => [])

		// 		try {
		// 			jest
		// 				.spyOn(testModule.get(JsonLoaderService), 'loadUsersFromFile')
		// 				.mockImplementation(mockLoadUsersFromFile)

		// 			resp = await controller.getUsers()
		// 		} catch (err) {
		// 			capturedError = err
		// 		}
		// 	})

		// 	afterEach(() => {
		// 		jest
		// 			.spyOn(testModule.get(JsonLoaderService), 'loadUsersFromFile')
		// 			.mockRestore()
		// 	})

		// 	it('invokes loadUsersFromFile(), does NOT throw error', () => {
		// 		expect(mockLoadUsersFromFile).toHaveBeenCalledTimes(1)
		// 		expect(capturedError).toBeUndefined()
		// 		expect(resp).toEqual([])
		// 	})
		// })

		describe('invoke searchUsers()', () => {
			let capturedError: Error
			// let mockHttpServiceGet: jest.Mock
			let mockSearchByName: jest.Mock
			let resp: Summoner | null

			beforeEach(async () => {
				// mockHttpServiceGet = jest.fn(() =>
				// 	Promise.resolve({
				// 		data: {} as Summoner,
				// 		status: HttpStatus.OK,
				// 	} as AxiosResponse<Summoner>))
				mockSearchByName = jest.fn(() =>
					Promise.resolve({ name: 'nameForWhichToSearch' } as Summoner),
				)

				try {
					// jest.spyOn(testModule.get(HttpService), 'get')
					// 	.mockImplementation(mockHttpServiceGet)
					jest
						.spyOn(summonerService, 'searchByName')
						.mockImplementation(mockSearchByName)

					resp = await controller.searchUsers('nameForWhichToSearch')
				} catch (err) {
					capturedError = err
				}
			})

			afterEach(() => {
				// jest.spyOn(testModule.get(HttpService), 'get')
				// 	.mockRestore()
				jest.spyOn(summonerService, 'searchByName').mockRestore()
			})

			it('invokes SummonerService.searchByName(), does NOT throw error', () => {
				// expect(mockHttpServiceGet).toHaveBeenCalledTimes(1)
				expect(mockSearchByName).toHaveBeenCalledTimes(1)
				expect(mockSearchByName).toHaveBeenLastCalledWith(
					'nameForWhichToSearch',
				)
				expect(capturedError).toBeUndefined()
				expect(resp).toEqual({ name: 'nameForWhichToSearch' } as Summoner)
			})
		})

		describe('invoke getById()', () => {
			let capturedError: Error
			let mockGetBySummonerId: jest.Mock
			let resp: Summoner | null

			beforeEach(async () => {
				mockGetBySummonerId = jest
					.fn()
					.mockResolvedValue({ id: 'id-that-was-searched' } as Summoner)

				try {
					jest
						.spyOn(summonerService, 'getBySummonerId')
						.mockImplementation(mockGetBySummonerId)

					resp = await controller.getBySummonerId('id-that-was-searched')
				} catch (err) {
					capturedError = err
				}
			})

			afterEach(() => {
				jest.spyOn(summonerService, 'getBySummonerId').mockRestore()
			})

			it('invokes SummonerService.getBySummonerId(), does NOT throw error', () => {
				expect(mockGetBySummonerId).toHaveBeenCalledTimes(1)
				expect(mockGetBySummonerId).toHaveBeenLastCalledWith(
					'id-that-was-searched',
				)
				expect(capturedError).toBeUndefined()
				expect(resp).toEqual({ id: 'id-that-was-searched' } as Summoner)
			})
		})
	})
})
