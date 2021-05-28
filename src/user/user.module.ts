import { HttpModule, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SummonerService } from '../services/summoner.service'
import { JsonLoaderService } from '../services/json-loader.service'
import { UserController } from './user.controller'

@Module({
	controllers: [UserController],
	imports: [HttpModule],
	providers: [ConfigService, JsonLoaderService, SummonerService, Logger],
})
export class UserModule {}
