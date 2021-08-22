import { Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { RateLimitService } from './rate-limit.service'

describe('RateLimitService', () => {
	let service: RateLimitService
	let testModule: TestingModule

	beforeEach(async () => {
		testModule = await Test.createTestingModule({
			controllers: [],
			imports: [],
			providers: [RateLimitService, Logger],
		}).compile()

		service = testModule.get(RateLimitService)
	})

	afterEach(async () => {
		await testModule.close()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('w/ mocked logger functions [ debug, error, log, verbose ]', () => {
		beforeEach(() => {
			toggleMockedLogger(testModule)
		})

		afterEach(() => {
			toggleMockedLogger(testModule, false)
		})
	})
})
