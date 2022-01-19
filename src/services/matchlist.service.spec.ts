import { HttpModule, HttpService } from '@nestjs/axios'
import { Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import {
	testCases_getGame,
	testCases_getMatchlist,
} from '../../test/test-cases'
import { toggleMockedLogger } from '../../test/utils'
import { Match } from '../models/match.model'
import { AppService } from './app.service'
import { MatchlistService } from './matchlist.service'

describe('Matchlist Service', () => {
	const fakeAPIKey = 'some-api-key'

	let service: MatchlistService
	let testModule: TestingModule
	let mockGetRiotToken: jest.Mock

	beforeEach(async () => {
		mockGetRiotToken = jest.fn().mockReturnValue(fakeAPIKey)

		testModule = await Test.createTestingModule({
			controllers: [],
			imports: [HttpModule],
			providers: [
				{
					provide: AppService,
					useFactory: () => ({
						getRiotToken: mockGetRiotToken,
					}),
				},
				MatchlistService,
				Logger,
			],
		}).compile()

		service = testModule.get(MatchlistService)
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

		testCases_getGame.forEach(
			({
				description,
				expectedCountHttpGet,
				expectedResult,
				mockHttpGet,
				paramGameId,
			}) => {
				describe(`w/ mocked HttpGet (${description})`, () => {
					beforeEach(() => {
						jest.spyOn(
							testModule.get(HttpService),
							'get',
						).mockImplementation(mockHttpGet)
					})

					describe(`invoke getGame(${paramGameId})`, () => {
						let actualResult: Match | null

						beforeEach(async () => {
							actualResult = await service.v5GetGame(paramGameId)
						})

						it('uses AppService for riotToken, invokes get() correctly and returns expected result', () => {
							expect(mockGetRiotToken).toHaveBeenCalledTimes(1)

							expect(mockHttpGet).toHaveBeenCalledTimes(
								expectedCountHttpGet,
							)
							if (expectedCountHttpGet > 0) {
								expect(mockHttpGet).toHaveBeenLastCalledWith(
									`https://americas.api.riotgames.com/lol/match/v5/matches/${paramGameId}`,
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

		testCases_getMatchlist.forEach(
			({
				description,
				expectedCountHttpGet,
				expectedCountGetGame,
				expectedUrlParamCount,
				expectedUrlParamQueueFilter,
				expectedResult,
				mockGetGame,
				mockHttpGet,
				paramPuuid,
				paramGetLastX,
				paramQueueType,
			}) => {
				describe(`w/ mocked HttpGet and v5GetGame (${description})`, () => {
					beforeEach(() => {
						jest.spyOn(service, 'v5GetGame').mockImplementation(
							mockGetGame,
						)
						jest.spyOn(
							testModule.get(HttpService),
							'get',
						).mockImplementation(mockHttpGet)
					})

					describe(`invoke getMatchlist("${paramPuuid}", ${paramGetLastX}, ${
						paramQueueType ? `"${paramQueueType}"` : paramQueueType
					})`, () => {
						let actualResult: Match[]

						beforeEach(async () => {
							actualResult = await service.v5GetMatchlist(
								paramPuuid,
								paramGetLastX,
								paramQueueType,
							)
						})

						it('uses AppService for riotToken, invokes get() correctly and returns expected result', () => {
							expect(mockGetRiotToken).toHaveBeenCalledTimes(1)

							expect(mockHttpGet).toHaveBeenCalledTimes(
								expectedCountHttpGet,
							)
							if (expectedCountHttpGet > 0) {
								const expectedFullUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${paramPuuid}/ids?count=${expectedUrlParamCount}${
									paramQueueType
										? expectedUrlParamQueueFilter
										: ''
								}`

								expect(mockHttpGet).toHaveBeenLastCalledWith(
									expectedFullUrl,
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
							expect(mockGetGame).toHaveBeenCalledTimes(
								expectedCountGetGame,
							)

							expect(actualResult).toEqual(expectedResult)
						})
					})
				})
			},
		)
	})
})
