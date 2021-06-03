import { HttpModule, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppService } from '../services/app.service'
import { JsonLoaderService } from '../services/json-loader.service'
import { SummonerService } from '../services/summoner.service'
import { UserController } from './user.controller'

@Module({
	controllers: [UserController],
	imports: [HttpModule],
	providers: [
		AppService,
		ConfigService,
		JsonLoaderService,
		SummonerService,
		Logger,
	],
})
export class UserModule {}
