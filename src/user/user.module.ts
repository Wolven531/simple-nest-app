import { HttpModule } from '@nestjs/axios'
import { Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MasteryService } from '../services/mastery.service'
import { SummonerService } from '../services/summoner.service'
import { UserService } from '../services/user.service'
import { SharedModule } from '../shared'
import { UserController } from './user.controller'
import { UsersResolver } from './users.resolver'

@Module({
	controllers: [UserController],
	imports: [HttpModule, SharedModule],
	providers: [
		ConfigService,
		MasteryService,
		SummonerService,
		UsersResolver,
		UserService,
		Logger,
	],
})
export class UserModule {}
