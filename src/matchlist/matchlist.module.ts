import { HttpModule, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MatchlistService } from '../services/matchlist.service'
import { SharedModule } from '../shared'
import { MatchlistController } from './matchlist.controller'

@Module({
	controllers: [MatchlistController],
	imports: [HttpModule, SharedModule],
	providers: [ConfigService, MatchlistService, Logger],
})
export class MatchlistModule {}
