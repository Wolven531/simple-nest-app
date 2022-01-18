import { COMMON_QUEUE_TYPES } from '../src/constants'
import { CalculatedStats } from '../src/models/calculated-stats.model'
import { Match } from '../src/models/match.model'

export type TestCase_CalculateGeneralStats = {
	expectedResult: CalculatedStats
	testDescription: string
	paramPuuid: string
	paramGames: Match[]
}

export type TestCase_GetGame = {
	description: string
	expectedCountHttpGet: number
	expectedResult: Match | null
	mockHttpGet: jest.Mock
	paramGameId: string
}

export type TestCase_GetMatchlist = {
	description: string
	expectedCountHttpGet: number
	expectedCountGetGame: number
	expectedUrlParamCount: number
	expectedUrlParamQueueFilter: string
	expectedResult: Match[]
	mockGetGame: jest.Mock
	mockHttpGet: jest.Mock
	paramPuuid: string
	paramGetLastX: number | undefined
	paramQueueType: keyof typeof COMMON_QUEUE_TYPES | undefined
}
