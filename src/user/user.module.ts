import { HttpModule } from '@nestjs/axios'
import { Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MasteryService } from '../services/mastery.service'
import { SummonerService } from '../services/summoner.service'
import { UserService } from './user.service'
import { SharedModule } from '../shared'
import { UserController } from './user.controller'
import { UserResolver } from './user.resolver'
import { UserMasteryService } from '../composite/user-mastery.service'

@Module({
	controllers: [UserController],
	imports: [HttpModule, SharedModule],
	providers: [
		ConfigService,
		MasteryService,
		SummonerService,
		UserResolver,
		UserService,
		UserMasteryService,
		Logger,
	],
})
export class UserModule {}
