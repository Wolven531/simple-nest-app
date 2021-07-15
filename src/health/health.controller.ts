import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Logger,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('health')
export class HealthController {
	private POSSIBLE_RESPONSES = [
		'A-OK',
		'fine',
		'okay',
		'okie-dokie',
		'stellar',
		'super',
	]

	constructor(
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	@Get()
	@ApiOperation({
		description: 'Basic endpoint to test server health',
		summary: 'Basic endpoint to test server health',
	})
	@ApiTags('check', 'health', 'healthcheck', 'server')
	@HttpCode(HttpStatus.OK)
	getHealth(): string {
		this.logger.verbose('GET request received', ' getHealth | Health-Ctrl ')

		const randomStatus =
			this.POSSIBLE_RESPONSES[
				Math.round(Math.random() * (this.POSSIBLE_RESPONSES.length - 1))
			]

		return `OK\r\n\r\nEverything on the server is ${randomStatus}`
	}
}
