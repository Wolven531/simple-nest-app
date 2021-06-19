import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Logger,
	Post,
	Query,
	Req,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'
import {
	ENV_API_KEY,
	ENV_API_KEY_DEFAULT,
	ENV_API_SECRET_KEY,
	ENV_API_SECRET_KEY_DEFAULT,
} from '../constants'
import { AppService } from '../services/app.service'
import { UpdateConfigDto } from './update-config.dto'

@ApiTags('config')
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

	@ApiTags('config')
	@Get()
	@HttpCode(HttpStatus.OK)
	async getConfig(
		@Query('secret') secret: string,
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
		const riotSecretOverride = this.appService.getRiotToken()
		const riotSecretOverridden = riotSecretOverride !== riotSecret
		const serverSecret = this.configService.get<string>(
			ENV_API_SECRET_KEY,
			ENV_API_SECRET_KEY_DEFAULT,
		)

		const privateConfig = {
			riotSecret,
			riotSecretOverridden,
			riotSecretOverride: riotSecretOverridden ? riotSecretOverride : undefined,
			riotTokenIsValid,
		}
		const publicConfig = {
			riotTokenIsValid,
		}

		return secret === serverSecret ? privateConfig : publicConfig
	}

	@ApiTags('config')
	@Get('check-token')
	@HttpCode(HttpStatus.OK)
	isTokenValid(): Promise<boolean> {
		this.logger.verbose('GET request received', ' isTokenValid | Config-Ctrl ')

		return this.appService.isRiotTokenValid()
	}

	@ApiTags('config')
	@Post('set-token')
	@HttpCode(HttpStatus.OK)
	updateConfig(
		@Body() updateConfigDto: UpdateConfigDto,
		@Req() req,
	): Promise<boolean> {
		this.logger.verbose(
			`updateConfigDto = ${JSON.stringify(updateConfigDto)}`,
			' updateConfig | Config-Ctrl ',
		)
		this.logger.verbose(
			`POST request received; secret="${updateConfigDto.secret}" token="${updateConfigDto.token}"`,
			' updateConfig | Config-Ctrl ',
		)
		this.logger.verbose(`req = ${req}`, ' updateConfig | Config-Ctrl ')

		const serverSecret = this.configService.get<string>(ENV_API_SECRET_KEY)

		if (updateConfigDto.secret !== serverSecret) {
			return Promise.resolve(false)
		}

		this.appService.setRiotToken(updateConfigDto.token)

		return Promise.resolve(true)
	}
}
