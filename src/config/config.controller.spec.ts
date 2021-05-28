import { HttpModule, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { ConfigController } from './config.controller'

describe('ConfigController', () => {
	const fakeApiKey = 'some-api-key'
	let controller: ConfigController
	let testModule: TestingModule

	beforeEach(async () => {
		testModule = await Test.createTestingModule({
			controllers: [ConfigController],
			imports: [HttpModule],
			providers: [
				{
					provide: ConfigService,
					useFactory: () => ({
						// NOTE: may need to udpate this mock logic when more config values are used
						// get: jest.fn((path, defaultVal) => fakeApiKey),
						get: jest.fn(() => fakeApiKey),
					}),
				},
				Logger,
			],
		}).compile()

		controller = testModule.get(ConfigController)
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

		describe('invoke getConfig()', () => {
			let resp: Record<string, string>

			beforeEach(async () => {
				resp = await controller.getConfig()
			})

			it('returns object w/ riotSecret property', () => {
				expect(resp).toEqual({
					riotSecret: fakeApiKey,
				})
			})
		})
	})
})
