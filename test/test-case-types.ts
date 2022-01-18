import { COMMON_QUEUE_TYPES } from '../src/constants'
import { CalculatedStats } from '../src/models/calculated-stats.model'
import { Game } from '../src/models/game.model'

export type TestCase_CalculateGeneralStats = {
	expectedResult: CalculatedStats
	testDescription: string
	paramPuuid: string
	paramGames: Game[]
}

export type TestCase_GetGame = {
	description: string
	expectedCountHttpGet: number
	expectedResult: Game | null
	mockHttpGet: jest.Mock
	paramGameId: string
}

export type TestCase_GetMatchlist = {
	description: string
	expectedCountHttpGet: number
	expectedCountGetGame: number
	expectedUrlParamCount: number
	expectedUrlParamQueueFilter: string
	expectedResult: Game[]
	mockGetGame: jest.Mock
	mockHttpGet: jest.Mock
	paramPuuid: string
	paramGetLastX: number | undefined
	paramQueueType: keyof typeof COMMON_QUEUE_TYPES | undefined
}
