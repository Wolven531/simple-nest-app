import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
// import { GraphQLModule } from '@nestjs/graphql'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ConfigurationModule } from '../config'
import { HealthModule } from '../health'
import { HttpRequestInterceptor } from '../http-request.interceptor'
import { MasteryModule } from '../mastery'
import { MatchlistModule } from '../matchlist'
import { SharedModule } from '../shared'
import { StatsModule } from '../stats'
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
		StatsModule, // contains stats endpoints
		UserModule, // contains user endpoints
		// GraphQLModule.forRoot({
		// 	autoSchemaFile: join(__dirname, 'schema.gql'),
		// 	// autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
		// 	debug: false,
		// 	installSubscriptionHandlers: true,
		// 	// path: 'gql',
		// 	// playground: true,
		// 	// resolver is provided through UserModule
		// 	// resolvers: [UsersResolver],
		// 	sortSchema: true,
		// 	// plugins: [
		// 	// ],
		// }),
	],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: HttpRequestInterceptor,
		},
	],
})
export class AppModule {}
