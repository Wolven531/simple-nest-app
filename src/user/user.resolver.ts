import { Inject, Logger } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { User } from '../models/user.model'
import { MasteryService } from '../services/mastery.service'
import { UserService } from './user.service'

@Resolver((of) => User)
export class UserResolver {
	constructor(
		@Inject(MasteryService)
		private readonly masteryService: MasteryService,
		@Inject(UserService)
		private readonly userService: UserService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	@Query((returns) => [User])
	async users(): Promise<User[]> {
		this.logger.debug('', ' User-Resolver | getUsers ')

		const updatedUsers = Promise.all(
			this.userService.users.map(async (user) => {
				const masteryTotal = await this.masteryService.getMasteryTotal(
					user.summonerId,
				)

				user.masteryTotal = masteryTotal

				return user
			}),
		)

		return updatedUsers
	}

	//   @Query(returns => User)
	//   async user(@Args('id', { type: () => Int }) id: number) {
	//     return this.authorsService.findOneById(id);
	//   }

	//   @ResolveField()
	//   async posts(@Parent() author: Author) {
	//     const { id } = author;
	//     return this.postsService.findAll({ authorId: id });
	//   }
}
