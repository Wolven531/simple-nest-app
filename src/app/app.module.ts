import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ConfigurationModule } from '../config'
import { HealthModule } from '../health'
import { HttpRequestInterceptor } from '../http-request.interceptor'
import { MasteryModule } from '../mastery'
import { MatchlistModule } from '../matchlist'
import { SharedModule } from '../shared'
// import { StatsModule } from '../stats'
import { UserModule } from '../user'
import { AppController } from './app.controller'

@Module({
	controllers: [AppController],
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '..', 'public'), // <-- path to the static files
		}),
		SharedModule, // contains 'boilerplate' stuff (e.g. Http, Logger, etc.)
		ConfigurationModule, // contains config endpoints
		HealthModule, // contains health endpoints
		MasteryModule, // contains user endpoints
		MatchlistModule, // contains matchlist endpoints
		// TODO - below not available until Riot makes match v5 API available to production API keys
		// StatsModule, // contains stats endpoints
		UserModule, // contains user endpoints
	],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: HttpRequestInterceptor,
		},
	],
})
export class AppModule {}
