import { HttpModule } from '@nestjs/axios'
import { Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
// import { AxiosResponse } from 'axios'
// import childProcess from 'child_process'
import { toggleMockedLogger } from '../../test/utils'
import { Summoner } from '../models/summoner.model'
import { User } from '../models/user.model'
import { SummonerService } from '../services/summoner.service'
import { UserController } from './user.controller'
import { UserMasteryService } from '../composite/user-mastery.service'

describe('UserController', () => {
	const fakeMasteryTotal = 7
	const fakeUpdated = new Date(2021, 7, 29)
	// TODO - use fakeUtcUpdated value for UTC testing
	// const fakeUtcUpdated = new Date(
	// 	fakeUpdated.getUTCFullYear(),
	// 	fakeUpdated.getUTCMonth(),
	// 	fakeUpdated.getUTCDate(),
	// 	fakeUpdated.getUTCHours(),
	// 	fakeUpdated.getUTCMinutes(),
	// 	fakeUpdated.getUTCSeconds(),
	// )
	const fakeUsers: User[] = [
		{
			accountId: 'asdf-1234-qwer',
			isFresh: true,
			lastUpdated: fakeUpdated,
			masteryTotal: 17,
			name: 'some user',
			puuid: 'puuid-1',
			summonerId: 'some-summoner-id',
		},
	]

	let controller: UserController
	let testModule: TestingModule

	let summonerService: SummonerService
	let userMasteryService: UserMasteryService

	beforeEach(async () => {
		jest.spyOn(Date, 'now').mockReturnValue(fakeUpdated.getTime())

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
					provide: UserMasteryService,
					useFactory: () =>
						({
							addUser: jest.fn(),
							getUserByFriendlyName: jest
								.fn()
								.mockResolvedValue(undefined),
							getUsers: jest.fn().mockResolvedValue(fakeUsers),
							getUsersWithMastery: jest.fn().mockResolvedValue(
								fakeUsers.map((user) => ({
									...user,
									masteryTotal: fakeMasteryTotal,
								})),
							),
							lookupSummonerByFriendlyName: jest
								.fn()
								.mockResolvedValue({ ...fakeUsers[0] }),
						} as Partial<UserMasteryService>),
				},
				Logger,
			],
		}).compile()

		controller = testModule.get(UserController)
		summonerService = testModule.get(SummonerService)
		userMasteryService = testModule.get(UserMasteryService)
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

			beforeEach((done) => {
				controller
					.getUsers()
					.then((users) => {
						resp = users
					})
					.catch((err) => {
						capturedError = err
					})
					.finally(() => {
						done()
					})
			})

			it('gets users from service w/ updated masteryTotal, does NOT throw error', () => {
				expect(capturedError).toBeUndefined()

				expect(
					userMasteryService.getUsersWithMastery,
				).toHaveBeenCalledTimes(1)

				expect(resp).toEqual(
					fakeUsers.map((u) => ({
						...u,
						// TODO - ensure User.lastUpdated gets updated
						// lastUpdated: fakeUtcUpdated,
						masteryTotal: fakeMasteryTotal,
					})),
				)
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
						userMasteryService,
						'lookupSummonerByFriendlyName',
					).mockImplementation(mockSearchByName)

					resp = await controller.searchSummoners(
						'nameForWhichToSearch',
					)
				} catch (err) {
					capturedError = err
				}
			})

			it('invokes UserMasteryService.lookupSummonerByFriendlyName(), does NOT throw error', () => {
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

		describe('invoke searchSummoners() w/ special chars ["M??yuk??"]', () => {
			let capturedError: Error
			let mockSearchByName: jest.Mock
			let resp: Summoner | null

			beforeEach(async () => {
				mockSearchByName = jest.fn(() =>
					Promise.resolve({ name: 'M??yuk??' } as Summoner),
				)

				try {
					jest.spyOn(
						userMasteryService,
						'lookupSummonerByFriendlyName',
					).mockImplementation(mockSearchByName)

					resp = await controller.searchSummoners('M??yuk??')
				} catch (err) {
					capturedError = err
				}
			})

			it('invokes UserMasteryService.lookupSummonerByFriendlyName() w/ encoded value, does NOT throw error', () => {
				expect(capturedError).toBeUndefined()

				expect(mockSearchByName).toHaveBeenCalledTimes(1)
				expect(mockSearchByName).toHaveBeenLastCalledWith('M??yuk??')
				expect(resp).toEqual({ name: 'M??yuk??' } as Summoner)
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

				spyAddUser = jest.spyOn(userMasteryService, 'addUser')

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
