import { Module } from '@nestjs/common'
import { ConfigurationModule } from '../config'
import { HealthModule } from '../health/health.module'
import { MasteryModule } from '../mastery/mastery.module'
import { MatchlistModule } from '../matchlist/matchlist.module'
import { SharedModule } from '../shared/shared.module'
import { UserModule } from '../user/user.module'
// local
import { AppController } from './app.controller'

@Module({
	controllers: [AppController],
	imports: [
		SharedModule, // contains 'boilerplate' stuff (e.g. Http, Logger, etc.)
		ConfigurationModule, // contains config endpoints
		HealthModule, // contains health endpoints
		MasteryModule, // contains user endpoints
		MatchlistModule, // contains matchlist endpoints
		UserModule, // contains user endpoints
	],
	providers: [],
})
export class AppModule {}
