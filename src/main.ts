import { HttpServer, Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
// import { GraphQLSchemaFactory } from '@nestjs/graphql'
// import { GraphQLSchemaBuilder } from '@nestjs/graphql/dist/graphql-schema.builder'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NextFunction, Request, Response } from 'express'
// import { GraphQLSchema } from 'graphql'
// import { readFileSync } from 'fs'
// import { join, resolve } from 'path'
// import compression from 'compression'
import 'reflect-metadata'
import { AppModule } from './app'
import { UserMasteryService } from './composite/user-mastery.service'
import { ENV_API_PORT, ENV_API_PORT_DEFAULT } from './constants'
import { AppService } from './services/app.service'
import * as usernameJson from './data/usernames.json'
import { Summoner } from './models/summoner.model'
import { MasteryService } from './services/mastery.service'
import { User } from './models/user.model'

async function bootstrap() {
	const ctx = ' bootstrap | main '
	const swaggerEndpoint = ''

	const app = await NestFactory.create(AppModule, {
		bodyParser: true,
		cors: {
			methods: ['get', 'patch', 'post'],
			origin: '*',
		},
		logger: ['debug', 'error', 'log', 'verbose', 'warn'],
	})

	const appService = app.get(AppService)
	const configService = app.get(ConfigService)
	// const userService = app.get(UserService)
	const userMasteryService = app.get(UserMasteryService)
	const masteryService = app.get(MasteryService)
	const logger = app.get(Logger)
	// const masteryService = app.get(MasteryService)

	app.use((req: Request, res: Response, next: NextFunction) => {
		// req.path is shorthand for url.parse(req.url).pathname
		// logger.log(`Global middleware, path="${req.path}"`, ctx)

		if (req.path === '/swagger-ui.css') {
			// !!! hacky; works, but style is ugly
			// res.setHeader('Content-Type', 'text/css')
			// res.end(monokaiTheme3, ENCODING_UTF8)
			// return
		}

		next()
	})

	app.useGlobalPipes(new ValidationPipe())

	logger.log('Creating OpenAPI Document...', ctx)

	const swaggerOptions = new DocumentBuilder()
		.setTitle('NextGen League Compare API')
		.setDescription(
			'This API feeds a web UI for the NextGen League Compare application',
		)
		.setExternalDoc(
			'Riot Official API Documentation',
			'https://developer.riotgames.com/apis',
		)
		.setVersion('1.0')
		// .addTag('compare')
		.build()
	const document = SwaggerModule.createDocument(app, swaggerOptions)

	logger.log(
		`Enabling Swagger documentation at "/${swaggerEndpoint}"...`,
		ctx,
	)

	SwaggerModule.setup(swaggerEndpoint, app, document)

	// NOTE: get values from ConfigService, which uses env files and vars
	const envApiKey = appService.getRiotToken()
	const port =
		process.env.PORT ||
		configService.get<number>(ENV_API_PORT, ENV_API_PORT_DEFAULT)

	logger.debug(`Loaded apiKey from env=${envApiKey}`, ctx)

	const isValid = await appService.isRiotTokenValid()

	if (!isValid) {
		logger.warn('Riot API token is invalid...', ctx)
	}

	// update users on app start
	const rawSummoners: Summoner[] = await Promise.all(
		usernameJson.map((name) =>
			userMasteryService.lookupSummonerByFriendlyName(name),
		),
	)
	const summoners = rawSummoners.filter((summoner) => !!summoner)
	const serverNow = new Date(Date.now())

	const users = await Promise.all(
		summoners.map(async (summoner) => {
			const totalMastery = await masteryService.getMasteryTotal(
				summoner.id,
			)

			return new User(
				summoner.accountId,
				new Date(
					serverNow.getUTCFullYear(),
					serverNow.getUTCMonth(),
					serverNow.getUTCDate(),
					serverNow.getUTCHours(),
					serverNow.getUTCMinutes(),
					serverNow.getUTCSeconds(),
				),
				totalMastery,
				summoner.name,
				summoner.puuid,
				summoner.id,
			)
		}),
	)
	userMasteryService.setup(users)
	// const isFresh = userService.isUsersFileFresh()

	// if (isFresh) {
	// 	logger.log('Skipping user refresh since users were all fresh', ctx)
	// } else if (isValid) {
	// 	logger.log(
	// 		'Users file is NOT fresh, attempting to refresh w/ valid token...',
	// 		ctx,
	// 	)

	// 	const updatedUsers = await masteryService.refreshMasteryTotalForAllUsers(
	// 		envApiKey,
	// 	)

	// 	logger.log(`Updated ${updatedUsers.length} users`, ctx)
	// }

	// TODO - enable compression
	// logger.log('Enabling API response compression...', ctx)

	// app.use(
	// 	compression({
	// 		level: 9,
	// 		memLevel: 9,
	// 		threshold: 256,
	// 	}),
	// )

	logger.log(`Listening for NestJS app on port ${port}...`, ctx)

	const server: HttpServer = await app.listen(port)

	// server.middl

	// const apolloServer = new ApolloServer({
	// schema: new GraphQLSchema({
	// })
	// schema: new GraphQLSchemaFactory()
	// typeDefs,
	// resolvers,
	// plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	// })

	// await apolloServer.start()
}

bootstrap()
