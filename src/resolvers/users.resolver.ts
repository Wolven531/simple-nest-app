import { Inject } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { User } from '../models/user.model'
import { UserService } from '../services/user.service'

@Resolver((of) => User)
export class UsersResolver {
	constructor(@Inject(UserService) private userService: UserService) {}

	@Query((returns) => [User])
	async users() {
		return this.userService.users
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
