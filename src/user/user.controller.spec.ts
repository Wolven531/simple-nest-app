// import { HttpModule, HttpService, HttpStatus, Logger } from '@nestjs/common'
import { HttpModule, Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
// import { AxiosResponse } from 'axios'
// import childProcess from 'child_process'
import { toggleMockedLogger } from '../../test/utils'
import { Summoner } from '../models/summoner.model'
import { User } from '../models/user.model'
import { SummonerService } from '../services/summoner.service'
import { UserService } from '../services/user.service'
import { UserController } from './user.controller'

describe('UserController', () => {
	let controller: UserController
	let testModule: TestingModule
	let summonerService: SummonerService
	let userService: UserService

	beforeEach(async () => {
		testModule = await Test.createTestingModule({
			controllers: [UserController],
			imports: [HttpModule],
			providers: [
				{
					provide: SummonerService,
					useFactory: () => ({
						getSummonerById: jest.fn().mockResolvedValue(undefined),
						searchByName: jest.fn().mockResolvedValue(undefined),
					}),
				},
				{
					provide: UserService,
					useFactory: () => ({
						addUser: jest.fn(),
						getUserByFriendlyName: jest.fn(() => undefined),
						loadUsersFromFile: jest.fn(() => []),
						users: [],
					}),
				},
				Logger,
			],
		}).compile()

		controller = testModule.get(UserController)
		summonerService = testModule.get(SummonerService)
		userService = testModule.get(UserService)
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
		// 				.spyOn(testModule.get(UserService), 'loadUsersFromFile')
		// 				.mockImplementation(mockLoadUsersFromFile)

		// 			resp = await controller.getUsers()
		// 		} catch (err) {
		// 			capturedError = err
		// 		}
		// 	})

		// 	it('invokes loadUsersFromFile(), does NOT throw error', () => {
		// 		expect(mockLoadUsersFromFile).toHaveBeenCalledTimes(1)
		// 		expect(capturedError).toBeUndefined()
		// 		expect(resp).toEqual([])
		// 	})
		// })

		describe('invoke searchSummoners()', () => {
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

					resp = await controller.searchSummoners('nameForWhichToSearch')
				} catch (err) {
					capturedError = err
				}
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
			let mockGetSummonerById: jest.Mock
			let resp: Summoner | null

			beforeEach(async () => {
				mockGetSummonerById = jest
					.fn()
					.mockResolvedValue({ id: 'id-that-was-searched' } as Summoner)

				try {
					jest
						.spyOn(summonerService, 'getSummonerById')
						.mockImplementation(mockGetSummonerById)

					resp = await controller.getSummonerById('id-that-was-searched')
				} catch (err) {
					capturedError = err
				}
			})

			it('invokes SummonerService.getSummonerById(), does NOT throw error', () => {
				expect(mockGetSummonerById).toHaveBeenCalledTimes(1)
				expect(mockGetSummonerById).toHaveBeenLastCalledWith(
					'id-that-was-searched',
				)
				expect(capturedError).toBeUndefined()
				expect(resp).toEqual({ id: 'id-that-was-searched' } as Summoner)
			})
		})

		describe('invoke addUser()', () => {
			let capturedError: Error
			let mockGetSummonerById: jest.Mock
			let spyAddUser: jest.SpyInstance
			let resp: User[]

			beforeEach(async () => {
				mockGetSummonerById = jest
					.fn()
					.mockResolvedValue({ id: 'id-that-was-searched' } as Summoner)

				jest
					.spyOn(summonerService, 'getSummonerById')
					.mockImplementation(mockGetSummonerById)

				spyAddUser = jest.spyOn(userService, 'addUser')

				try {
					resp = await controller.addUser('id-that-was-searched')
				} catch (err) {
					capturedError = err
				}
			})

			it('invokes SummonerService.getSummonerById(), does NOT throw error', () => {
				expect(mockGetSummonerById).toHaveBeenCalledTimes(1)
				expect(mockGetSummonerById).toHaveBeenLastCalledWith(
					'id-that-was-searched',
				)

				expect(spyAddUser).toHaveBeenCalledTimes(1)

				expect(capturedError).toBeUndefined()
			})
		})
	})
})
