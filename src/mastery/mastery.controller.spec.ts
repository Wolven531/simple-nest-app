import { HttpModule, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { JsonLoaderService } from '../services/json-loader.service'
import { MasteryService } from '../services/mastery.service'
import { MasteryController } from './mastery.controller'

describe('MasteryController', () => {
	let controller: MasteryController
	let testModule: TestingModule

	beforeEach(async () => {
		testModule = await Test.createTestingModule({
			controllers: [MasteryController],
			imports: [HttpModule],
			providers: [ConfigService, JsonLoaderService, Logger, MasteryService],
		}).compile()

		controller = testModule.get(MasteryController)
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

		describe('invoke getMasteryTotal("") (w/ empty string)', () => {
			let resp: number

			beforeEach(async () => {
				resp = await controller.getMasteryTotal('')
			})

			it('returns -1', () => {
				expect(resp).toBe(-1)
			})
		})
	})
})
