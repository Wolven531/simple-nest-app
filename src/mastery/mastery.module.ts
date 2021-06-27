import { HttpModule, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
// import { JsonLoaderService } from '../services/json-loader.service'
// import { MatchlistService } from '../services/matchlist.service'
import { MasteryService } from '../services/mastery.service'
import { SharedModule } from '../shared/shared.module'
import { MasteryController } from './mastery.controller'

@Module({
	controllers: [MasteryController],
	imports: [HttpModule, SharedModule],
	providers: [
		ConfigService,
		// JsonLoaderService,
		// MatchlistService,
		MasteryService,
		Logger,
	],
})
export class MasteryModule {}
