import { Inject, Injectable, Logger } from '@nestjs/common'

@Injectable()
export class RateLimitService {
	/**
	 *
	 */
	constructor(@Inject(Logger) private readonly logger: Logger) {}
}
