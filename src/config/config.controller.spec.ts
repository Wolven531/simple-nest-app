import { HttpModule, Logger } from '@nestjs/common'
// import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { AppService } from '../services/app.service'
import { ConfigController } from './config.controller'

describe('ConfigController', () => {
	// const fakeApiKey = 'some-api-key'
	let controller: ConfigController
	let testModule: TestingModule
	let mockIsRiotTokenValid: jest.Mock

	beforeEach(async () => {
		mockIsRiotTokenValid = jest.fn().mockResolvedValue(true)

		testModule = await Test.createTestingModule({
			controllers: [ConfigController],
			imports: [HttpModule],
			providers: [
				{
					provide: AppService,
					useFactory: () => ({
						isRiotTokenValid: mockIsRiotTokenValid,
					}),
				},
				// {
				// 	provide: ConfigService,
				// 	useFactory: () => ({
				// 		// NOTE: may need to udpate this mock logic when more config values are used
				// 		// get: jest.fn((path, defaultVal) => fakeApiKey),
				// 		get: jest.fn(() => fakeApiKey),
				// 	}),
				// },
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

		describe('invoke getConfig() w/ mocked return from AppSvc set to true', () => {
			const fakeValidity = true
			let resp: Record<string, unknown>

			beforeEach(async () => {
				mockIsRiotTokenValid.mockResolvedValue(fakeValidity)

				resp = await controller.getConfig()
			})

			it('returns object w/ riotTokenIsValid set according to mocked return from AppSvc', () => {
				expect(resp).toEqual({
					riotTokenIsValid: fakeValidity,
				})
			})
		})

		describe('invoke getConfig() w/ mocked return from AppSvc set to false', () => {
			const fakeValidity = false
			let resp: Record<string, unknown>

			beforeEach(async () => {
				mockIsRiotTokenValid.mockResolvedValue(fakeValidity)

				resp = await controller.getConfig()
			})

			it('returns object w/ riotTokenIsValid set according to mocked return from AppSvc', () => {
				expect(resp).toEqual({
					riotTokenIsValid: fakeValidity,
				})
			})
		})
	})
})
