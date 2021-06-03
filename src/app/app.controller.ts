import { Controller, Inject, Logger } from '@nestjs/common'

@Controller('app')
export class AppController {
	constructor(
		@Inject(Logger)
		private readonly logger: Logger,
	) {}
}
