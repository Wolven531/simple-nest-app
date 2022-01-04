import { Inject, Logger } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { UserMasteryService } from '../composite/user-mastery.service'
import { User } from '../models/user.model'
import { MasteryService } from '../services/mastery.service'
import { UserService } from './user.service'

@Resolver((of) => User)
export class UserResolver {
	constructor(
		@Inject(UserMasteryService)
		private readonly userMasteryService: UserMasteryService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	@Query((returns) => [User])
	async users(): Promise<User[]> {
		this.logger.debug('', ' User-Resolver | users ')

		return this.userMasteryService.getUsersWithMastery()
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
