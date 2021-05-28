import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Logger,
} from '@nestjs/common'
import { AppService } from '../services/app.service'

@Controller('app')
export class AppController {
	constructor(
		private readonly appService: AppService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	@Get('check-token')
	@HttpCode(HttpStatus.OK)
	isTokenValid(): Promise<boolean> {
		this.logger.verbose('GET request received', ' isTokenValid | App-Ctrl ')

		return this.appService.isRiotTokenValid()
	}
}
