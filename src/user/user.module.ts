import { HttpModule, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SummonerService } from '../services/summoner.service'
import { UserService } from '../services/user.service'
import { SharedModule } from '../shared'
import { UserController } from './user.controller'

@Module({
	controllers: [UserController],
	imports: [HttpModule, SharedModule],
	providers: [ConfigService, SummonerService, UserService, Logger],
})
export class UserModule {}
