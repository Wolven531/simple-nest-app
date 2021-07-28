import { HttpModule } from '@nestjs/axios'
import { Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
// import { MatchlistService } from '../services/matchlist.service'
import { MasteryService } from '../services/mastery.service'
import { SummonerService } from '../services/summoner.service'
import { SharedModule } from '../shared'
import { MasteryController } from './mastery.controller'

@Module({
	controllers: [MasteryController],
	imports: [HttpModule, SharedModule],
	providers: [
		ConfigService,
		// MatchlistService,
		MasteryService,
		SummonerService,
		Logger,
	],
})
export class MasteryModule {}
