import { Logger } from '@nestjs/common'
import { HttpRequestInterceptor } from './http-request.interceptor'

describe('HttpRequestInterceptor', () => {
	it('should be defined', () => {
		expect(new HttpRequestInterceptor(new Logger())).toBeDefined()
	})
})
