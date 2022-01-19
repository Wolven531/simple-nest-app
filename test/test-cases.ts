import { HttpStatus } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { from } from 'rxjs'
import {
	COMMON_QUEUE_TYPES,
	MAX_NUM_MATCHES,
	MIN_NUM_MATCHES,
} from '../src/constants'
import { CalculatedStats } from '../src/models/calculated-stats.model'
import { Match } from '../src/models/match.model'
import {
	TestCase_CalculateGeneralStats,
	TestCase_GetGame,
	TestCase_GetMatchlist,
} from './test-case-types'
import { FAKE_MATCH } from './fakes'
// import { deserialize } from 'class-transformer'

// const DeserializedFakeMatch = deserialize(Match, JSON.stringify(FakeMatch))

export const testCases_CalculateGeneralStats: TestCase_CalculateGeneralStats[] =
	[
		{
			expectedResult: new CalculatedStats(
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
			),
			testDescription: 'empty puuid and empty games array',
			paramPuuid: '',
			paramGames: [],
		},
		{
			expectedResult: new CalculatedStats(
				1,
				13768,
				13768,
				3.727272727272727,
				1352,
				1352,
				35,
				35,
				11,
				11,
				6,
				6,
				0,
				1,
				100,
				0,
				0,
			),
			testDescription: 'a single Match (w/ a win that matches)',
			paramPuuid:
				'iI1Bb6J3FprYZ7De0Yi3MMHql2mhHQ4cfusM0z0hW71Noow7fnkJqb_LZYw4kA3F9i0FaWZ7tkn1cw',
			// paramGames: [FakeMatch],
			// paramGames: [DeserializedFakeMatch],
			paramGames: [FAKE_MATCH],
		},
		{
			expectedResult: new CalculatedStats(
				1,
				14440,
				14440,
				2.4166666666666665,
				1352,
				1352,
				20,
				20,
				12,
				12,
				9,
				9,
				1,
				0,
				0,
				0,
				0,
			),
			testDescription: 'a single Match (w/ a loss that matches)',
			paramPuuid:
				'-ezYn-k39TSn42zD7a2NcewPStW18C9sOQSEhU8wtYR3_L47fZOViqCnOxCO8QN3ogdT03JDeO8aQA',
			paramGames: [FAKE_MATCH],
		},
		{
			expectedResult: new CalculatedStats(
				1,
				0,
				0,
				0,
				1352,
				1352,
				0,
				0,
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
			),
			testDescription: 'a single Match (w/ no identity matches)',
			paramPuuid: 'a3',
			paramGames: [FAKE_MATCH],
		},
	]

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
		expectedResult: {
			info: { gameCreation: 333, gameDuration: 444 },
		} as Match,
		mockHttpGet: jest.fn(() =>
			from(
				Promise.resolve({
					data: {
						info: {
							gameCreation: 333,
							gameDuration: 444,
						},
					} as Match,
					status: HttpStatus.OK,
				} as AxiosResponse),
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
		expectedResult: [
			{ info: { gameId: 'match-id-1' } } as unknown as Match,
		],
		mockGetGame: jest.fn(() =>
			Promise.resolve({
				info: { gameId: 'match-id-1' },
			} as unknown as Match),
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
		expectedResult: [
			{ info: { gameId: 'match-id-1' } } as unknown as Match,
		],
		mockGetGame: jest.fn(() =>
			Promise.resolve({
				info: { gameId: 'match-id-1' },
			} as unknown as Match),
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
		expectedResult: [
			{ info: { gameId: 'match-id-1' } } as unknown as Match,
		],
		mockGetGame: jest.fn(() =>
			Promise.resolve({
				info: { gameId: 'match-id-1' },
			} as unknown as Match),
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
		description: 'Include match data - Returned data is good',
		expectedCountHttpGet: 1,
		expectedCountGetGame: 1,
		expectedUrlParamCount: 1,
		expectedUrlParamQueueFilter: '',
		expectedResult: [
			{ info: { gameId: 'match-id-1' } } as unknown as Match,
		],
		mockGetGame: jest.fn(() =>
			Promise.resolve({
				info: { gameId: 'match-id-1' },
			} as unknown as Match),
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
		expectedResult: [
			{ info: { gameId: 'match-id-1' } } as unknown as Match,
		],
		mockGetGame: jest.fn(() =>
			Promise.resolve({
				info: { gameId: 'match-id-1' },
			} as unknown as Match),
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
