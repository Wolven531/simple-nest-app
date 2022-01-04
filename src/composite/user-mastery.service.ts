import { Inject, Injectable, Logger } from '@nestjs/common'
import { User } from '../models/user.model'
import { MasteryService } from '../services/mastery.service'
import { IUserService } from '../types'
import { UserService } from '../user/user.service'

@Injectable()
export class UserMasteryService implements IUserService {
	constructor(
		@Inject(UserService)
		private readonly userService: UserService,
		@Inject(MasteryService)
		private readonly masteryService: MasteryService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	addUser(newUser: User) {
		return this.userService.addUser(newUser)
	}

	async getUserByFriendlyName(
		friendlyName: string,
	): Promise<User | undefined> {
		return this.userService.getUserByFriendlyName(friendlyName)
	}

	async getUsers(): Promise<User[]> {
		this.logger.debug('', ' User-Mastery-Svc | getUsers ')

		const users = await this.userService.getUsers()

		const updatedUsers = Promise.all(
			users.map(async (user) => {
				const masteryTotal = await this.masteryService.getMasteryTotal(
					user.summonerId,
				)

				user.masteryTotal = masteryTotal

				return user
			}),
		)

		return updatedUsers
	}

	async getUsersWithMastery(): Promise<User[]> {
		this.logger.debug('', ' User-Mastery-Svc | getUsersWithMastery ')

		const users = await this.userService.getUsers()

		const updatedUsers = Promise.all(
			users.map(async (user) => {
				const masteryTotal = await this.masteryService.getMasteryTotal(
					user.summonerId,
				)

				user.masteryTotal = masteryTotal

				return user
			}),
		)

		return updatedUsers
	}

	setup(data?: User[]) {
		return this.userService.setup(data)
	}
}
