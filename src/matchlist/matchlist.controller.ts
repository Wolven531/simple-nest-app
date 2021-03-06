import {
	Controller,
	Get,
	Header,
	HttpCode,
	HttpStatus,
	Inject,
	Logger,
	Param,
	Query,
} from '@nestjs/common'
import {
	ApiExtraModels,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger'
import {
	puuidExamples,
	COMMON_QUEUE_TYPES,
	MAX_NUM_MATCHES,
	MIN_NUM_MATCHES,
	queueTypeExamples,
} from '../constants'
import { Match } from '../models/match.model'
import { MatchlistService } from '../services/matchlist.service'

@ApiTags('matchlist')
@ApiExtraModels(Match)
@Controller('matchlist')
export class MatchlistController {
	constructor(
		@Inject(MatchlistService)
		private readonly matchlistService: MatchlistService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	@Get(':puuid')
	@ApiOperation({
		description:
			'Get a list of games from the Riot API (match v5 currently) for a given Summoner puuid',
		externalDocs: {
			description: 'Riot API Get Matchlist Endpoint Docs',
			url: 'https://developer.riotgames.com/apis#match-v5/GET_getMatchIdsByPUUID',
		},
		summary: 'Get a list of games for a given Summoner puuid',
	})
	@ApiParam({
		allowEmptyValue: false,
		description: 'puuid of a Summoner',
		examples: puuidExamples,
		name: 'puuid',
		required: true,
		style: 'simple',
		type: 'string',
	})
	@ApiQuery({
		allowEmptyValue: false,
		description: 'The number of matches to retrieve; 10 by default',
		examples: {
			'Default (not specified)': {
				value: undefined,
			},
			'Custom number of matches': {
				value: '',
			},
			'Minimum number of matches': {
				value: MIN_NUM_MATCHES,
			},
			'Maximum number of matches': {
				value: MAX_NUM_MATCHES,
			},
		},
		name: 'getLastX',
		required: false,
		style: 'simple',
		type: 'number',
	})
	@ApiQuery({
		allowEmptyValue: false,
		description:
			'Optional filter to return only matches w/ a certain queue',
		enum: Object.keys(COMMON_QUEUE_TYPES),
		examples: queueTypeExamples,
		name: 'queueType',
		required: false,
		style: 'simple',
		type: 'string',
	})
	@ApiTags('match')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	getMatchlist(
		@Param('puuid') puuid: string,
		@Query('getLastX') getLastX = 10,
		@Query('queueType')
		queueType: keyof typeof COMMON_QUEUE_TYPES = undefined,
	): Promise<Match[]> {
		this.logger.log(
			`puuid="${puuid}" getLastX=${getLastX} queueType="${queueType}"`,
			' getMatchlist | MatchlistCtrl ',
		)

		return this.matchlistService.v5GetMatchlist(puuid, getLastX, queueType)
	}

	@Get('game/:gameId')
	@ApiOperation({
		description:
			'Get a Match from the Riot API (match v4 currently) using a given gameId',
		externalDocs: {
			description: 'Riot API Get Match Endpoint Docs',
			url: 'https://developer.riotgames.com/apis#match-v5/GET_getMatch',
		},
		summary: 'Get a Match using a given gameId',
	})
	@ApiParam({
		allowEmptyValue: false,
		description: 'gameId of a Match',
		examples: {
			'Custom Match ID': {
				value: '',
			},
		},
		name: 'gameId',
		required: true,
		style: 'simple',
		type: 'string',
	})
	@ApiTags('match')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	getGame(@Param('gameId') gameId: string): Promise<Match> {
		this.logger.log(`gameId=${gameId}`, ' getGame | MatchlistCtrl ')

		return this.matchlistService.v5GetGame(gameId) as Promise<Match>
	}
}
