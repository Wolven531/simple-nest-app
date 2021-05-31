import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Logger,
} from '@nestjs/common'
// import { ConfigService } from '@nestjs/config'
import { AppService } from '../services/app.service'
// import { ENV_API_KEY, ENV_API_KEY_DEFAULT } from '../constants'

@Controller('config')
export class ConfigController {
	constructor(
		@Inject(AppService)
		private readonly appService: AppService,
		// @Inject(ConfigService)
		// private readonly configService: ConfigService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getConfig(): Promise<Record<string, unknown>> {
		this.logger.verbose('GET request received', ' getConfig | Config-Ctrl ')

		const riotTokenIsValid = await this.appService.isRiotTokenValid()

		// const riotSecret = this.configService.get<string>(
		// 	ENV_API_KEY,
		// 	ENV_API_KEY_DEFAULT,
		// )
		// return {
		// 	riotSecret,
		// }

		return {
			riotTokenIsValid,
		}
	}
}
