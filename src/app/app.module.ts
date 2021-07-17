import { Module } from '@nestjs/common'
import { ConfigurationModule } from '../config'
import { HealthModule } from '../health'
import { MasteryModule } from '../mastery'
// import { MatchlistModule } from '../matchlist'
import { SharedModule } from '../shared/shared.module'
// import { StatsModule } from '../stats'
import { UserModule } from '../user'
import { AppController } from './app.controller'

@Module({
	controllers: [AppController],
	imports: [
		SharedModule, // contains 'boilerplate' stuff (e.g. Http, Logger, etc.)
		ConfigurationModule, // contains config endpoints
		HealthModule, // contains health endpoints
		MasteryModule, // contains user endpoints
		// TODO - below not available until Riot makes match v5 API available to production API keys
		// MatchlistModule, // contains matchlist endpoints
		// StatsModule, // contains stats endpoints
		UserModule, // contains user endpoints
	],
	providers: [],
})
export class AppModule {}
