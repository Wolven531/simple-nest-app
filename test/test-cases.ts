import { HttpStatus } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { from, Observable } from 'rxjs'
import {
	COMMON_QUEUE_TYPES,
	MAX_NUM_MATCHES,
	MIN_NUM_MATCHES,
} from '../src/constants'
import { GameV5 } from '../src/models/v5/game-v5.model'
import { TestCase_GetGame, TestCase_GetMatchlist } from './test-case-types'

export const testCases_getGame: TestCase_GetGame[] = [
	{
		description: 'Http error occurs',
		expectedCountHttpGet: 1,
		expectedResult: null,
		mockHttpGet: jest.fn(() =>
			from(Promise.reject(new Error('Fake ajw error'))),
		),
		paramGameId: '1',
	},
	{
		description: 'Returned data is bad',
		expectedCountHttpGet: 1,
		expectedResult: null,
		mockHttpGet: jest.fn(() => from(Promise.resolve({}))),
		paramGameId: '2',
	},
	{
		description: 'Returned data is good',
		expectedCountHttpGet: 1,
		expectedResult: { gameCreation: 333, gameDuration: 444 } as GameV5,
		mockHttpGet: jest.fn(() =>
			from(
				Promise.resolve({
					data: {
						info: {
							gameCreation: 333,
							gameDuration: 444,
						} as GameV5,
					},
				}),
			),
		),
		paramGameId: '3',
	},
]

export const testCases_getMatchlist: TestCase_GetMatchlist[] = [
	{
		description: 'Http error occurs',
		expectedCountHttpGet: 1,
		expectedCountGetGame: 0,
		expectedUrlParamCount: 10,
		expectedUrlParamQueueFilter: '',
		expectedResult: [],
		mockGetGame: jest.fn(() => Promise.resolve()),
		mockHttpGet: jest.fn(() =>
			from(Promise.reject(new Error('Fake ajw error'))),
		),
		paramPuuid: 'some-puuid',
		paramGetLastX: undefined,
		paramQueueType: undefined,
	},
	{
		description: 'Returned data is bad',
		expectedCountHttpGet: 1,
		expectedCountGetGame: 0,
		expectedUrlParamCount: 10,
		expectedUrlParamQueueFilter: '',
		expectedResult: [],
		mockGetGame: jest.fn(() => Promise.resolve()),
		mockHttpGet: jest.fn(() => from(Promise.resolve({}))),
		paramPuuid: 'some-puuid',
		paramGetLastX: undefined,
		paramQueueType: undefined,
	},
	{
		description: 'No filters - Returned data is good',
		expectedCountHttpGet: 1,
		expectedCountGetGame: 1,
		expectedUrlParamCount: 10,
		expectedUrlParamQueueFilter: '',
		expectedResult: [{ gameId: 'match-id-1' } as unknown as GameV5],
		mockGetGame: jest.fn(() =>
			Promise.resolve({ gameId: 'match-id-1' } as unknown as GameV5),
		),
		mockHttpGet: jest.fn(() =>
			from(
				Promise.resolve({
					data: ['match-id-1'],
					status: HttpStatus.OK,
				} as AxiosResponse),
			),
		),
		paramPuuid: 'some-puuid',
		paramGetLastX: undefined,
		paramQueueType: undefined,
	},
	{
		description:
			'Get Last X is below MIN_NUM_MATCHES - Returned data is good',
		expectedCountHttpGet: 1,
		expectedCountGetGame: 1,
		expectedUrlParamCount: MIN_NUM_MATCHES,
		expectedUrlParamQueueFilter: '',
		expectedResult: [{ gameId: 'match-id-1' } as unknown as GameV5],
		mockGetGame: jest.fn(() =>
			Promise.resolve({ gameId: 'match-id-1' } as unknown as GameV5),
		),
		mockHttpGet: jest.fn(() =>
			from(
				Promise.resolve({
					data: ['match-id-1'],
					status: HttpStatus.OK,
				} as AxiosResponse),
			),
		),
		paramPuuid: 'some-puuid',
		paramGetLastX: MIN_NUM_MATCHES - 1,
		paramQueueType: undefined,
	},
	{
		description:
			'Get Last X is above MAX_NUM_MATCHES - Returned data is good',
		expectedCountHttpGet: 1,
		expectedCountGetGame: 1,
		expectedUrlParamCount: MAX_NUM_MATCHES,
		expectedUrlParamQueueFilter: '',
		expectedResult: [{ gameId: 'match-id-1' } as unknown as GameV5],
		mockGetGame: jest.fn(() =>
			Promise.resolve({ gameId: 'match-id-1' } as unknown as GameV5),
		),
		mockHttpGet: jest.fn(() =>
			from(
				Promise.resolve({
					data: ['match-id-1'],
					status: HttpStatus.OK,
				} as AxiosResponse),
			),
		),
		paramPuuid: 'some-puuid',
		paramGetLastX: MAX_NUM_MATCHES + 1,
		paramQueueType: undefined,
	},
	{
		description: 'Include game data - Returned data is good',
		expectedCountHttpGet: 1,
		expectedCountGetGame: 1,
		expectedUrlParamCount: 1,
		expectedUrlParamQueueFilter: '',
		// new GameV5(
		// 	222,
		// 	333,
		// 	444,
		// 	'CLASSIC',
		// 	'MATCHED_GAME',
		// 	'v1',
		// 	1,
		// 	[],
		// 	[],
		// 	'p1',
		// 	COMMON_QUEUE_TYPES.aram.id,
		// 	2020,
		// 	[],
		// ),
		expectedResult: [{ gameId: 'match-id-1' } as unknown as GameV5],
		mockGetGame: jest.fn(() =>
			Promise.resolve({ gameId: 'match-id-1' } as unknown as GameV5),
		),
		mockHttpGet: jest.fn(() =>
			from(
				Promise.resolve({
					data: ['match-id-1'],
					status: HttpStatus.OK,
				} as AxiosResponse),
			),
		),
		paramPuuid: 'some-puuid',
		paramGetLastX: 1,
		paramQueueType: undefined,
	},
	{
		description: 'include queue filter - Returned data is good',
		expectedCountHttpGet: 1,
		expectedCountGetGame: 1,
		expectedUrlParamCount: 1,
		expectedUrlParamQueueFilter: `&queue=${COMMON_QUEUE_TYPES.aram.id}`,
		// new Game(
		// 	222,
		// 	333,
		// 	444,
		// 	'CLASSIC',
		// 	'MATCHED_GAME',
		// 	'v1',
		// 	1,
		// 	[],
		// 	[],
		// 	'p1',
		// 	COMMON_QUEUE_TYPES.aram.id,
		// 	2020,
		// 	[],
		// ),
		expectedResult: [{ gameId: 'match-id-1' } as unknown as GameV5],
		mockGetGame: jest.fn(() =>
			Promise.resolve({ gameId: 'match-id-1' } as unknown as GameV5),
		),
		mockHttpGet: jest.fn(() =>
			from(
				Promise.resolve({
					data: ['match-id-1'],
					status: HttpStatus.OK,
				} as AxiosResponse),
			),
		),
		paramPuuid: 'some-puuid',
		paramGetLastX: 1,
		paramQueueType: 'aram',
	},
]
