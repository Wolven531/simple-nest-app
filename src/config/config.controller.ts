import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Logger,
	// Param,
	Query,
} from '@nestjs/common'
// import { ApiParam } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { AppService } from '../services/app.service'
import {
	ENV_API_KEY,
	ENV_API_KEY_DEFAULT,
	ENV_API_SECRET_KEY,
	ENV_API_SECRET_KEY_DEFAULT,
} from '../constants'

@Controller('config')
export class ConfigController {
	constructor(
		@Inject(AppService)
		private readonly appService: AppService,
		@Inject(ConfigService)
		private readonly configService: ConfigService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	// @ApiParam({
	// 	description: 'Optional administrative value',
	// 	name: 'secret',
	// 	required: false,
	// })
	@Get()
	@HttpCode(HttpStatus.OK)
	async getConfig(
		// @Param('secret') secret: string,
		// @Query('secret') secret: string,
		// @Query('secret') secret: string | undefined = undefined,
		// @Query() secret: string = undefined,
		// @Query() secret: string,
		@Query('secret') secret: string,
		// @Query() query: Record<string, unknown>,
		// secret: string = undefined,
		// secret: string,
	): Promise<Record<string, unknown>> {
		this.logger.verbose(
			`GET request received (w/ secret = ${!!secret}, secret="${secret}")`,
			' getConfig | Config-Ctrl ',
		)

		const riotTokenIsValid = await this.appService.isRiotTokenValid()

		const riotSecret = this.configService.get<string>(
			ENV_API_KEY,
			ENV_API_KEY_DEFAULT,
		)
		const serverSecret = this.configService.get<string>(
			ENV_API_SECRET_KEY,
			ENV_API_SECRET_KEY_DEFAULT,
		)

		const privateConfig = {
			riotSecret,
			riotTokenIsValid,
		}
		const publicConfig = {
			riotTokenIsValid,
		}

		return secret === serverSecret ? privateConfig : publicConfig
	}
}
