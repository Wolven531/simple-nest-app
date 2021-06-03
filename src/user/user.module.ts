import { HttpModule, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JsonLoaderService } from '../services/json-loader.service'
import { SummonerService } from '../services/summoner.service'
import { SharedModule } from '../shared/shared.module'
import { UserController } from './user.controller'

@Module({
	controllers: [UserController],
	imports: [HttpModule, SharedModule],
	providers: [ConfigService, JsonLoaderService, SummonerService, Logger],
})
export class UserModule {}
