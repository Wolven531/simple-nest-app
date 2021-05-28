import { HttpModule, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JsonLoaderService } from '../services/json-loader.service'
import { MatchlistService } from '../services/matchlist.service'
import { MatchlistController } from './matchlist.controller'

@Module({
	controllers: [MatchlistController],
	imports: [HttpModule],
	providers: [ConfigService, JsonLoaderService, MatchlistService, Logger],
})
export class MatchlistModule {}
