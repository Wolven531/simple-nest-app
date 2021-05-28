import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Logger,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ENV_API_KEY, ENV_API_KEY_DEFAULT } from '../constants'

@Controller('config')
export class ConfigController {
	constructor(
		@Inject(ConfigService)
		private readonly configService: ConfigService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	getConfig(): Record<string, string> {
		this.logger.verbose('GET request received', ' getConfig | Config-Ctrl ')

		return {
			riotSecret: this.configService.get<string>(
				ENV_API_KEY,
				ENV_API_KEY_DEFAULT,
			),
		}
	}
}
