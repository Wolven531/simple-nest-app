import {
	CallHandler,
	ExecutionContext,
	Inject,
	Injectable,
	Logger,
	NestInterceptor,
} from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'

@Injectable()
export class HttpRequestInterceptor implements NestInterceptor {
	constructor(
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		if (context.getType() !== 'http') {
			return next.handle()
		}

		const httpCtx = context.switchToHttp()
		const req: Request = httpCtx.getRequest()

		this.logger.debug(`Got req w/ path="${req.path}"`, ' http-req-intercept ')

		return next.handle()
	}
}
