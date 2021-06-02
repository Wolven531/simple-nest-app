import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Logger,
	// Param,
	Put,
	Query,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ENV_API_SECRET_KEY } from '../constants'
import { AppService } from '../services/app.service'

@Controller('app')
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly configService: ConfigService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	@Get('check-token')
	@HttpCode(HttpStatus.OK)
	isTokenValid(): Promise<boolean> {
		this.logger.verbose('GET request received', ' isTokenValid | App-Ctrl ')

		return this.appService.isRiotTokenValid()
	}

	// @ApiParam({
	// 	name: 'secret',
	// 	type: String,
	// 	allowEmptyValue: false,
	// 	required: true,
	// })
	// @ApiParam({
	// 	name: 'token',
	// 	type: String,
	// 	allowEmptyValue: false,
	// 	required: true,
	// })
	@Put('set-token')
	@HttpCode(HttpStatus.OK)
	setToken(
		// @Body('secret', new ValidationPipe({ expectedType: String }))
		// @Body('secret') secret: string,
		// @Body('token') token: string,
		// @Param('secret') secret: string,
		// @Param('token') token: string,
		@Query('secret') secret: string,
		@Query('token') token: string,
		// secret: string,
		// token: string,
		// @Req() req: Request,
	): Promise<boolean> {
		this.logger.verbose(
			`PUT request received; secret="${secret}" token="${token}"`,
			' setToken | App-Ctrl ',
		)

		const serverSecret = this.configService.get<string>(ENV_API_SECRET_KEY)

		if (secret !== serverSecret) {
			return Promise.resolve(false)
		}

		this.appService.setRiotToken(token)
		return Promise.resolve(true)
	}
}
