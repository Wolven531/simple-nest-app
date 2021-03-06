import { Controller, Inject, Logger } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('app')
@Controller('app')
export class AppController {
	constructor(
		@Inject(Logger)
		private readonly logger: Logger,
	) {}
}
