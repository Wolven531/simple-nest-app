import { HttpModule, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { ENV_API_KEY, ENV_API_SECRET_KEY } from '../constants'
import { AppService } from '../services/app.service'
import { ConfigController } from './config.controller'

describe('ConfigController', () => {
	const fakeApiKey = 'some-api-key'
	const fakeServerSecret = 'some-other-secret'
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
						getRiotToken: jest.fn().mockReturnValue(fakeApiKey),
					}),
				},
				{
					provide: ConfigService,
					useFactory: () => ({
						// NOTE: may need to udpate this mock logic when more config values are used
						get: jest.fn((path, defaultVal) => {
							switch (path) {
								case ENV_API_KEY:
									return fakeApiKey
								case ENV_API_SECRET_KEY:
									return fakeServerSecret
								default:
									return ''
							}
						}),
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

		describe('invoke getConfig() w/ mocked return from AppSvc set to true, secret provided matches config value', () => {
			const fakeValidity = true
			let resp: Record<string, unknown>

			beforeEach(async () => {
				mockIsRiotTokenValid.mockResolvedValue(fakeValidity)

				resp = await controller.getConfig(fakeServerSecret)
			})

			it('returns object w/ riotTokenIsValid and riotSecret set according to mocked return from AppSvc and config', () => {
				expect(resp).toEqual({
					riotSecret: fakeApiKey,
					riotSecretOverridden: false,
					riotSecretOverride: undefined,
					riotTokenIsValid: fakeValidity,
				})
			})
		})

		describe('invoke getConfig() w/ mocked return from AppSvc set to false', () => {
			const fakeValidity = false
			let resp: Record<string, unknown>

			beforeEach(async () => {
				mockIsRiotTokenValid.mockResolvedValue(fakeValidity)

				resp = await controller.getConfig(undefined)
			})

			it('returns object w/ riotTokenIsValid set according to mocked return from AppSvc', () => {
				expect(resp).toEqual({
					riotTokenIsValid: fakeValidity,
				})
			})
		})
	})
})
