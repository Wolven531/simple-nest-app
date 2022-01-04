import { Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { UserMasteryService } from '../composite/user-mastery.service'
import { User } from '../models/user.model'
import { MasteryService } from '../services/mastery.service'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

describe('UserResolver', () => {
	const fakeUpdated = new Date(2021, 7, 29)
	const fakeUsers: User[] = [
		{
			accountId: 'asdf-1234-qwer',
			isFresh: true,
			lastUpdated: fakeUpdated,
			masteryTotal: 17,
			name: 'some user',
			summonerId: 'some-summoner-id',
		},
	]
	let resolver: UserResolver
	let service: UserMasteryService
	let testModule: TestingModule

	beforeEach(async () => {
		testModule = await Test.createTestingModule({
			controllers: [],
			imports: [],
			providers: [
				UserResolver,
				{
					provide: UserMasteryService,
					useFactory: () =>
						({
							getUsersWithMastery: jest
								.fn()
								.mockResolvedValue(fakeUsers),
						} as Partial<UserMasteryService>),
				},
				Logger,
			],
		}).compile()

		service = testModule.get(UserMasteryService)
		resolver = testModule.get(UserResolver)
	})

	afterEach(async () => {
		await testModule.close()
	})

	describe('invoke users()', () => {
		let result: User[]
		let error: any

		beforeEach((done) => {
			resolver
				.users()
				.then((users) => {
					result = users
				})
				.catch((err) => {
					error = err
				})
				.finally(() => {
					done()
				})
		})

		it('returns expected collection of user objects w/o error', () => {
			expect(error).toBeUndefined()

			expect(result).toEqual(fakeUsers)
		})
	})
})
