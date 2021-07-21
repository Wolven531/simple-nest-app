import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NextFunction, Request, Response } from 'express'
// import { readFileSync } from 'fs'
// import { join, resolve } from 'path'
// import compression from 'compression'
import 'reflect-metadata'
import { AppModule } from './app'
import { ENV_API_PORT, ENV_API_PORT_DEFAULT } from './constants'
import { AppService } from './services/app.service'
// import { monokaiTheme3 } from './theme-monokai-hack'

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
	const logger = app.get(Logger)
	// const masteryService = app.get(MasteryService)

	app.use((req: Request, res: Response, next: NextFunction) => {
		// req.path is shorthand for url.parse(req.url).pathname
		// logger.log(`Global middleware, path="${req.path}"`, ctx)

		if (req.path === '/swagger-ui.css') {
			// attempt 1 - C:\dev\simple-nest-app\dist\theme-monokai.css
			// const monokaiTheme = readFileSync(join(__dirname, 'theme-monokai.css'), {
			// 	encoding: ENCODING_UTF8,
			// })
			// attempt 2 - C:\dev\simple-nest-app\theme-monokai.css
			// const monokaiTheme = readFileSync(resolve('./theme-monokai.css'), {
			// 	encoding: ENCODING_UTF8,
			// })
			// attempt 3 - C:\dev\simple-nest-app\dist\public\theme-monokai.css
			// const monokaiTheme = readFileSync(
			// 	join(__dirname, 'public', 'theme-monokai.css'),
			// 	{
			// 		encoding: ENCODING_UTF8,
			// 	},
			// )
			// attempt 4 is hack that works, but style is ugly
			// res.setHeader('Content-Type', 'text/css')
			// res.end(monokaiTheme3, ENCODING_UTF8)
			// return
		}

		next()
	})

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

	logger.log(`Enabling Swagger documentation at "/${swaggerEndpoint}"...`, ctx)

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

	// TODO - potentially update users on app start
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

	await app.listen(port)
}
bootstrap()
