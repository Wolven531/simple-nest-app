import { HttpModule, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MatchlistService } from '../services/matchlist.service'
import { StatsService } from '../services/stats.service'
import { SharedModule } from '../shared/shared.module'
import { StatsController } from './stats.controller'

@Module({
	controllers: [StatsController],
	imports: [HttpModule, SharedModule],
	providers: [ConfigService, MatchlistService, StatsService, Logger],
})
export class StatsModule {}
