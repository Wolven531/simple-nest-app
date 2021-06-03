import { Module } from '@nestjs/common'
import { SharedModule } from '../shared/shared.module'
import { UserModule } from '../user/user.module'
// import { MasteryModule } from '../mastery/mastery.module'
// import { MatchlistModule } from '../matchlist/matchlist.module'
// services
// import { JsonLoaderService } from '../services/json-loader.service'
// import { MatchlistService } from '../services/matchlist.service'
// import { StatsService } from '../services/stats.service'
// import { StatsModule } from '../stats/stats.module'
// local
import { AppController } from './app.controller'

@Module({
	controllers: [AppController],
	imports: [
		SharedModule,
		UserModule,
		// MasteryModule,
		// MatchlistModule,
		// StatsModule,
	],
	providers: [
		// JsonLoaderService,
		// MatchlistService,
		// StatsService,
	],
})
export class AppModule {}
