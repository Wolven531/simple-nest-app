import { HttpModule, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { toggleMockedLogger } from '../../test/utils'
import { AppService } from '../services/app.service'
import { AppController } from './app.controller'

type TestCase_IsTokenValid = {
	descriptionMockedBehavior: string
	expectedResult: boolean
	mockIsRiotTokenValid: jest.Mock
}

describe('AppController', () => {
	const testCases: TestCase_IsTokenValid[] = [
		{
			descriptionMockedBehavior: 'service method returns true (mocked)',
			expectedResult: true,
			mockIsRiotTokenValid: jest.fn(() => Promise.resolve(true)),
		},
		{
			descriptionMockedBehavior: 'service method returns false (mocked)',
			expectedResult: false,
			mockIsRiotTokenValid: jest.fn(() => Promise.resolve(false)),
		},
	]
	let controller: AppController
	let testModule: TestingModule

	beforeEach(async () => {
		testModule = await Test.createTestingModule({
			controllers: [AppController],
			imports: [HttpModule],
			providers: [ConfigService, AppService, Logger],
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

		testCases.forEach(
			({ descriptionMockedBehavior, expectedResult, mockIsRiotTokenValid }) => {
				describe(`invoke isTokenValid() when ${descriptionMockedBehavior}`, () => {
					let actualResult: boolean

					beforeEach(async () => {
						jest
							.spyOn(testModule.get(AppService), 'isRiotTokenValid')
							.mockImplementation(mockIsRiotTokenValid)

						actualResult = await controller.isTokenValid()
					})

					afterEach(() => {
						jest
							.spyOn(testModule.get(AppService), 'isRiotTokenValid')
							.mockRestore()
					})

					it('invokes isRiotTokenValid() and returns expected value', () => {
						expect(mockIsRiotTokenValid).toHaveBeenCalledTimes(1)
						expect(actualResult).toBe(expectedResult)
					})
				})
			},
		)
	})
})
