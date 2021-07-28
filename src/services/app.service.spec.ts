import { HttpModule, HttpService } from '@nestjs/axios'
import { HttpStatus, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { from } from 'rxjs'
import { toggleMockedLogger } from '../../test/utils'
import { AppService } from './app.service'

type TestCase_IsRiotTokenValid = {
	descriptionMockedBehavior: string
	expectedCountGet: number
	expectedResult: boolean
	mockHttpGet: jest.Mock
}

describe('App Service', () => {
	const testCases: TestCase_IsRiotTokenValid[] = [
		{
			descriptionMockedBehavior:
				'request completes successfully w/ NOT HttpStatus.FORBIDDEN',
			expectedCountGet: 1,
			expectedResult: false,
			mockHttpGet: jest.fn(() =>
				from(Promise.resolve({ status: HttpStatus.FORBIDDEN })),
			),
		},
		{
			descriptionMockedBehavior: 'request fails',
			expectedCountGet: 1,
			expectedResult: false,
			mockHttpGet: jest.fn(() =>
				from(Promise.reject(new Error('fake AJW error'))),
			),
		},
	]
	let service: AppService
	let testModule: TestingModule

	beforeEach(async () => {
		testModule = await Test.createTestingModule({
			controllers: [],
			imports: [HttpModule],
			providers: [
				{
					provide: ConfigService,
					useFactory: () => ({
						get: jest.fn().mockReturnValue('some-api-key'),
					}),
				},
				AppService,
				Logger,
			],
		}).compile()

		service = testModule.get(AppService)
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

		describe('getRiotToken() w/o setting it', () => {
			let actual: string

			beforeEach(() => {
				actual = service.getRiotToken()
			})

			it('returns value from ConfigService', () => {
				expect(actual).toEqual('some-api-key')
			})

			describe('setRiotToken()', () => {
				beforeEach(() => {
					service.setRiotToken('overridden-value')
				})

				it('sets private override value, and return value from getRiotToken() is updated', () => {
					expect(service['overrideToken']).toEqual('overridden-value')
					expect(service.getRiotToken()).toEqual('overridden-value')
				})
			})
		})

		testCases.forEach(
			({
				descriptionMockedBehavior,
				expectedCountGet,
				expectedResult,
				mockHttpGet,
			}) => {
				describe(`w/ mocked HTTP Get (${descriptionMockedBehavior})`, () => {
					beforeEach(() => {
						jest
							.spyOn(testModule.get(HttpService), 'get')
							.mockImplementation(mockHttpGet)
					})

					afterEach(() => {
						jest.spyOn(testModule.get(HttpService), 'get').mockRestore()
					})

					describe('invoke isRiotTokenValid()', () => {
						let actualResult: boolean

						beforeEach(async () => {
							actualResult = await service.isRiotTokenValid()
						})

						it('invokes get() correctly and returns expected result', () => {
							expect(mockHttpGet).toHaveBeenCalledTimes(expectedCountGet)

							if (expectedCountGet > 0) {
								expect(mockHttpGet).toHaveBeenLastCalledWith(
									'https://na1.api.riotgames.com/lol/status/v3/shard-data',
									{
										headers: {
											'Accept-Charset':
												'application/x-www-form-urlencoded; charset=UTF-8',
											'Accept-Language': 'en-US,en;q=0.9',
											'X-Riot-Token': 'some-api-key',
										},
									},
								)
							}

							expect(actualResult).toEqual(expectedResult)
						})
					})
				})
			},
		)
	})
})
