import { object, string } from '@hapi/joi'
import { HttpModule, Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APIConfig } from '../config'
import { AppService } from '../services/app.service'

@Module({
	exports: [AppService, ConfigModule, HttpModule, Logger],
	imports: [
		// NOTE: see https://docs.nestjs.com/techniques/configuration for more info
		ConfigModule.forRoot({
			envFilePath: ['.env.production', '.env.development', '.env'],
			isGlobal: true,
			validationOptions: {
				abortEarly: false,
				allowUnknown: true,
			},
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
		}),
		HttpModule,
	],
	providers: [AppService, Logger],
})
export class SharedModule {}
