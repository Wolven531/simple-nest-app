import { object, string } from '@hapi/joi'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APIConfig, ConfigurationModule } from '../config'
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
		// NOTE: see https://docs.nestjs.com/techniques/configuration for more info
		ConfigModule.forRoot({
			envFilePath: ['.env.production', '.env.development', '.env'],
			isGlobal: true,
			validationSchema: object<APIConfig>({
				// vals w/ defaults below
				// API_PORT: number().default(3050),
				// NODE_ENV: string()
				// 	.valid('development', 'production', 'test')
				// 	.default('development'),
				// SLC_API_DOCKER_TAG: string().default('v0.1'),
				// required below
				RIOT_SECRET: string().required(),
				SERVER_SECRET: string().required(),
			}),
			validationOptions: {
				abortEarly: false,
				allowUnknown: true,
			},
		}),
		ConfigurationModule,
		// MasteryModule,
		// MatchlistModule,
		// StatsModule,
		SharedModule,
		UserModule,
	],
	providers: [
		// JsonLoaderService,
		// MatchlistService,
		// StatsService,
	],
})
export class AppModule {}
