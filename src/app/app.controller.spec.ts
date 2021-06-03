import { Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { AppController } from './app.controller'

describe('AppController', () => {
	let controller: AppController
	let testModule: TestingModule

	beforeEach(async () => {
		testModule = await Test.createTestingModule({
			controllers: [AppController],
			imports: [],
			providers: [Logger],
		}).compile()

		controller = testModule.get(AppController)
	})

	afterEach(async () => {
		await testModule.close()
	})

	describe('w/ mocked logger functions [ debug, error, log, verbose ]', () => {
		beforeEach(() => {
			toggleMockedLogger(testModule)
		})

		afterEach(() => {
			toggleMockedLogger(testModule, false)
		})

		it('creates controller properly', () => {
			expect(controller).toBeDefined()
		})
	})
})
