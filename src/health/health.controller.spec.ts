import { Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { HealthController } from './health.controller'

describe('HealthController', () => {
	let controller: HealthController
	let testModule: TestingModule

	beforeEach(async () => {
		testModule = await Test.createTestingModule({
			controllers: [HealthController],
			providers: [Logger],
		}).compile()

		controller = testModule.get<HealthController>(HealthController)
	})

	afterEach(async () => {
		await testModule.close()
	})

	it('creates controller', () => {
		expect(controller).toBeDefined()
	})

	describe('w/ mocked logger functions [ debug, error, log, verbose ]', () => {
		beforeEach(() => {
			toggleMockedLogger(testModule)
		})

		afterEach(() => {
			toggleMockedLogger(testModule, false)
		})

		describe('invoke getHealth()', () => {
			let resp: string

			beforeEach(async () => {
				resp = await controller.getHealth()
			})

			it('returns string that starts w/ consistent response', () => {
				const expectedStart = 'OK\r\n\r\nEverything on the server is '

				expect(resp.startsWith(expectedStart)).toBe(true)
			})
		})
	})
})
