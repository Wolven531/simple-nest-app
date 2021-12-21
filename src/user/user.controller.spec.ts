import { HttpModule } from '@nestjs/axios'
import { Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
// import { AxiosResponse } from 'axios'
// import childProcess from 'child_process'
import { toggleMockedLogger } from '../../test/utils'
import { Summoner } from '../models/summoner.model'
import { User } from '../models/user.model'
import { MasteryService } from '../services/mastery.service'
import { SummonerService } from '../services/summoner.service'
import { UserService } from '../services/user.service'
import { UserController } from './user.controller'

describe('UserController', () => {
	const fakeMasteryTotal = 7
	const fakeUpdated = new Date(2021, 7, 29)
	const fakeUtcUpdated = new Date(
		fakeUpdated.getUTCFullYear(),
		fakeUpdated.getUTCMonth(),
		fakeUpdated.getUTCDate(),
		fakeUpdated.getUTCHours(),
		fakeUpdated.getUTCMinutes(),
		fakeUpdated.getUTCSeconds(),
	)

	let controller: UserController
	let testModule: TestingModule

	let masteryService: MasteryService
	let summonerService: SummonerService
	let userService: UserService

	beforeEach(async () => {
		jest.spyOn(Date, 'now').mockReturnValue(fakeUpdated.getTime())

		testModule = await Test.createTestingModule({
			controllers: [UserController],
			imports: [HttpModule],
			providers: [
				{
					provide: MasteryService,
					useFactory: () => ({
						getMasteryTotal: jest
							.fn()
							.mockResolvedValue(fakeMasteryTotal),
					}),
				},
				{
					provide: SummonerService,
					useFactory: () => ({
						getSummonerById: jest.fn().mockResolvedValue(undefined),
						searchByName: jest.fn().mockResolvedValue(undefined),
					}),
				},
				{
					provide: UserService,
					useClass: UserService, // instance has spies configured below
				},
				Logger,
			],
		}).compile()

		controller = testModule.get(UserController)
		masteryService = testModule.get(MasteryService)
		summonerService = testModule.get(SummonerService)
		userService = testModule.get(UserService)

		jest.spyOn(userService, 'addUser').mockImplementation(jest.fn())
		jest.spyOn(userService, 'getUserByFriendlyName').mockReturnValue(
			undefined,
		)
		jest.spyOn(userService as any, 'loadUsersFromFile').mockReturnValue([
			{
				accountId: 'asdf-1234-qwer',
				lastUpdated: fakeUpdated,
				summonerId: 'some-summoner-id',
			},
		] as User[])
		jest.spyOn(userService, 'users', 'get').mockReturnValue([
			{
				accountId: 'asdf-1234-qwer',
				lastUpdated: fakeUtcUpdated,
				summonerId: 'some-summoner-id',
			},
		] as User[])
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
		// 		expect(capturedError).toBeUndefined()

		// 		expect(mockExecFileSync).toHaveBeenCalledTimes(1)
		// 		expect(resp).toBe('OK')
		// 	})
		// })

		describe('invoke getUsers()', () => {
			let capturedError: Error
			let resp: User[]

			beforeEach(async () => {
				try {
					resp = await controller.getUsers()
				} catch (err) {
					capturedError = err
				}
			})

			it('gets users from service w/ updated masteryTotal, does NOT throw error', () => {
				expect(capturedError).toBeUndefined()

				expect(masteryService.getMasteryTotal).toHaveBeenCalledTimes(1)
				expect(resp).toEqual([
					{
						accountId: 'asdf-1234-qwer',
						lastUpdated: fakeUtcUpdated,
						masteryTotal: fakeMasteryTotal,
						summonerId: 'some-summoner-id',
					} as User,
				])
			})
		})

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
					Promise.resolve({
						masteryTotal: fakeMasteryTotal,
						name: 'nameForWhichToSearch',
					} as unknown as Summoner),
				)

				try {
					// jest.spyOn(testModule.get(HttpService), 'get')
					// 	.mockImplementation(mockHttpServiceGet)
					jest.spyOn(
						summonerService,
						'searchByName',
					).mockImplementation(mockSearchByName)

					resp = await controller.searchSummoners(
						'nameForWhichToSearch',
					)
				} catch (err) {
					capturedError = err
				}
			})

			it('invokes SummonerService.searchByName(), does NOT throw error', () => {
				expect(capturedError).toBeUndefined()

				expect(mockSearchByName).toHaveBeenCalledTimes(1)
				expect(mockSearchByName).toHaveBeenLastCalledWith(
					'nameForWhichToSearch',
				)
				expect(resp).toEqual({
					masteryTotal: fakeMasteryTotal,
					name: 'nameForWhichToSearch',
				} as unknown as Summoner)
			})
		})

		describe('invoke searchSummoners() w/ special chars ["Míyukí"]', () => {
			let capturedError: Error
			let mockSearchByName: jest.Mock
			let resp: Summoner | null

			beforeEach(async () => {
				mockSearchByName = jest.fn(() =>
					Promise.resolve({ name: 'Míyukí' } as Summoner),
				)

				try {
					jest.spyOn(
						summonerService,
						'searchByName',
					).mockImplementation(mockSearchByName)

					resp = await controller.searchSummoners('Míyukí')
				} catch (err) {
					capturedError = err
				}
			})

			it('invokes SummonerService.searchByName() w/ encoded value, does NOT throw error', () => {
				expect(capturedError).toBeUndefined()

				expect(mockSearchByName).toHaveBeenCalledTimes(1)
				expect(mockSearchByName).toHaveBeenLastCalledWith(
					'M%C3%ADyuk%C3%AD',
				)
				expect(resp).toEqual({ name: 'Míyukí' } as Summoner)
			})
		})

		describe('invoke getById()', () => {
			let capturedError: Error
			let mockGetSummonerById: jest.Mock
			let resp: Summoner | null

			beforeEach(async () => {
				mockGetSummonerById = jest.fn().mockResolvedValue({
					id: 'id-that-was-searched',
				} as Summoner)

				try {
					jest.spyOn(
						summonerService,
						'getSummonerById',
					).mockImplementation(mockGetSummonerById)

					resp = await controller.getSummonerById(
						'id-that-was-searched',
					)
				} catch (err) {
					capturedError = err
				}
			})

			it('invokes SummonerService.getSummonerById(), does NOT throw error', () => {
				expect(capturedError).toBeUndefined()

				expect(mockGetSummonerById).toHaveBeenCalledTimes(1)
				expect(mockGetSummonerById).toHaveBeenLastCalledWith(
					'id-that-was-searched',
				)
				expect(resp).toEqual({ id: 'id-that-was-searched' } as Summoner)
			})
		})

		describe('invoke addUser()', () => {
			let capturedError: Error
			let mockGetSummonerById: jest.Mock
			let spyAddUser: jest.SpyInstance
			let resp: User[]

			beforeEach(async () => {
				mockGetSummonerById = jest.fn().mockResolvedValue({
					id: 'user-that-is-being-added',
				} as Summoner)

				jest.spyOn(
					summonerService,
					'getSummonerById',
				).mockImplementation(mockGetSummonerById)

				spyAddUser = jest.spyOn(userService, 'addUser')

				try {
					resp = await controller.addUser('user-that-is-being-added')
				} catch (err) {
					capturedError = err
				}
			})

			it('invokes SummonerService.getSummonerById(), does NOT throw error', () => {
				expect(capturedError).toBeUndefined()

				expect(mockGetSummonerById).toHaveBeenCalledTimes(1)
				expect(mockGetSummonerById).toHaveBeenLastCalledWith(
					'user-that-is-being-added',
				)

				expect(spyAddUser).toHaveBeenCalledTimes(1)
			})
		})
	})
})
