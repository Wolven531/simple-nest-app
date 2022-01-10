import { COMMON_QUEUE_TYPES } from '../src/constants'
import { CalculatedStats } from '../src/models/calculated-stats.model'
import { GameV5 } from '../src/models/v5/game-v5.model'

export type TestCase_CalculateGeneralStats = {
	expectedResult: CalculatedStats
	testDescription: string
	paramPuuid: string
	paramGames: GameV5[]
}

export type TestCase_GetGame = {
	description: string
	expectedCountHttpGet: number
	expectedResult: GameV5 | null
	mockHttpGet: jest.Mock
	paramGameId: string
}

export type TestCase_GetMatchlist = {
	description: string
	expectedCountHttpGet: number
	expectedCountGetGame: number
	expectedUrlParamCount: number
	expectedUrlParamQueueFilter: string
	expectedResult: GameV5[]
	mockGetGame: jest.Mock
	mockHttpGet: jest.Mock
	paramPuuid: string
	paramGetLastX: number | undefined
	paramQueueType: keyof typeof COMMON_QUEUE_TYPES | undefined
}
