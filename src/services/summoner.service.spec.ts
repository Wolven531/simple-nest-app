import { HttpModule, HttpService } from '@nestjs/axios'
import { HttpStatus, Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AxiosResponse } from 'axios'
import { from } from 'rxjs'
import { toggleMockedLogger } from '../../test/utils'
import { REGION } from '../constants'
import { Summoner } from '../models/summoner.model'
import { AppService } from './app.service'
import { SummonerService } from './summoner.service'

type TestCase_SearchByName = {
	descriptionMockedBehavior: string
	expectedCountGet: number
	expectedResult: Summoner | null
	mockHttpGet: jest.Mock
	param: string
}

describe('Summoner Service', () => {
	const fakeAPIKey = 'some-api-key'
	const fakeSummonerId = 'some-someer-id'
	const testCases_searchByName: TestCase_SearchByName[] = [
		{
			descriptionMockedBehavior: 'request fails',
			expectedCountGet: 1,
			expectedResult: null,
			mockHttpGet: jest.fn(() =>
				from(Promise.reject(new Error('fake AJW error'))),
			),
			param: '',
		},
		{
			descriptionMockedBehavior: 'request succeeds w/ NOT_FOUND',
			expectedCountGet: 1,
			expectedResult: null,
			mockHttpGet: jest.fn(() =>
				from(
					Promise.resolve({
						status: HttpStatus.NOT_FOUND,
					} as AxiosResponse<Summoner>),
				),
			),
			param: '',
		},
		{
			descriptionMockedBehavior: 'request succeeds and has data',
			expectedCountGet: 1,
			expectedResult: { name: 'summ-name-1' } as Summoner,
			mockHttpGet: jest.fn(() =>
				from(
					Promise.resolve({
						data: { name: 'summ-name-1' } as Summoner,
						status: HttpStatus.OK,
					} as AxiosResponse<Summoner>),
				),
			),
			param: 'summ-name-1',
		},
	]
	let service: SummonerService
	let testModule: TestingModule

	beforeEach(async () => {
		testModule = await Test.createTestingModule({
			controllers: [],
			imports: [HttpModule],
			providers: [
				{
					provide: AppService,
					useFactory: () => ({
						getRiotToken: jest.fn().mockReturnValue(fakeAPIKey),
					}),
				},
				SummonerService,
				Logger,
			],
		}).compile()

		service = testModule.get(SummonerService)
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

		describe('invoke getSummonerById()', () => {
			const fakeSummoner = { name: 'summ-name-1' } as Summoner
			let capturedError: Error
			let resp: Summoner
			let mockHttpGet: jest.Mock

			beforeEach(async () => {
				mockHttpGet = jest.fn().mockReturnValue(
					from(
						Promise.resolve({
							data: fakeSummoner,
							status: HttpStatus.OK,
						} as AxiosResponse<Summoner>),
					),
				)

				jest.spyOn(
					testModule.get(HttpService),
					'get',
				).mockImplementation(mockHttpGet)

				try {
					resp = await service.getSummonerById(fakeSummonerId)
				} catch (err) {
					capturedError = err
				}
			})

			it('invokes Http get() properly, and returns Summoner, does NOT throw error', () => {
				expect(capturedError).toBeUndefined()

				expect(mockHttpGet).toHaveBeenCalledTimes(1)
				expect(mockHttpGet).toHaveBeenLastCalledWith(
					`https://${REGION}.api.riotgames.com/lol/summoner/v4/summoners/${fakeSummonerId}`,
					{
						headers: {
							'Accept-Charset':
								'application/x-www-form-urlencoded; charset=UTF-8',
							'Accept-Language': 'en-US,en;q=0.9',
							'X-Riot-Token': fakeAPIKey,
						},
					},
				)

				expect(resp).toEqual(fakeSummoner)
			})
		})

		testCases_searchByName.forEach(
			({
				descriptionMockedBehavior,
				expectedCountGet,
				expectedResult,
				mockHttpGet,
				param,
			}) => {
				describe(`w/ mocked HTTP Get (${descriptionMockedBehavior})`, () => {
					beforeEach(() => {
						jest.spyOn(
							testModule.get(HttpService),
							'get',
						).mockImplementation(mockHttpGet)
					})

					describe('invoke searchByName()', () => {
						let actualResult: Summoner | null

						beforeEach(async () => {
							actualResult = await service.searchByName(param)
						})

						it('invokes get() correctly and returns expected result', () => {
							expect(mockHttpGet).toHaveBeenCalledTimes(
								expectedCountGet,
							)

							if (expectedCountGet > 0) {
								expect(mockHttpGet).toHaveBeenLastCalledWith(
									`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${param}`,
									{
										headers: {
											'Accept-Charset':
												'application/x-www-form-urlencoded; charset=UTF-8',
											'Accept-Language': 'en-US,en;q=0.9',
											'X-Riot-Token': fakeAPIKey,
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
