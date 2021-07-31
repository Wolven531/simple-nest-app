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
import { accountIdExamples } from 'src/constants'
import { Game } from '../models/game.model'
import { Match } from '../models/match.model'
import { MatchlistService } from '../services/matchlist.service'

@ApiTags('matchlist')
@ApiExtraModels(Game, Match)
@Controller('matchlist')
export class MatchlistController {
	constructor(
		@Inject(MatchlistService)
		private readonly matchlistService: MatchlistService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	@Get(':accountId')
	@ApiOperation({
		description:
			'Get a list of matches from the Riot API (match v4 currently) for a given Summoner accountId',
		externalDocs: {
			description: 'Riot API Get Matchlist Endpoint Docs',
			url: 'https://developer.riotgames.com/apis#match-v4/GET_getMatchlist',
		},
		summary: 'Get a list of matches for a given Summoner accountId',
	})
	@ApiParam({
		allowEmptyValue: false,
		description: 'accountId of a Summoner',
		examples: accountIdExamples,
		name: 'accountId',
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
				value: 1,
			},
			'Maximum number of matches': {
				value: 100,
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
			'Whether to return game data alongside match data; false by default',
		examples: {
			'Default (not specified)': {
				value: undefined,
			},
			'Request with game data (includeGameData=true)': {
				value: true,
			},
			'Request without game data (includeGameData=false)': {
				value: false,
			},
		},
		name: 'includeGameData',
		required: false,
		style: 'simple',
		type: 'boolean',
	})
	@ApiTags('match')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	getMatchlist(
		@Param('accountId') accountId: string,
		@Query('getLastX') getLastX = 10,
		@Query('includeGameData') includeGameData = false,
	): Promise<Match[] | Game[]> {
		this.logger.log(
			`accountId="${accountId}" getLastX=${getLastX} includeGameData=${includeGameData}`,
			' getMatchlist | MatchlistCtrl ',
		)

		return this.matchlistService.v4GetMatchlist(
			accountId,
			getLastX,
			includeGameData,
		)
	}

	@Get('game/:gameId')
	@ApiOperation({
		description:
			'Get a Game from the Riot API (match v4 currently) using a given gameId',
		externalDocs: {
			description: 'Riot API Get Match Endpoint Docs',
			url: 'https://developer.riotgames.com/apis#match-v4/GET_getMatch',
		},
		summary: 'Get a Game using a given gameId',
	})
	@ApiParam({
		allowEmptyValue: false,
		description: 'gameId of a Game',
		examples: {
			'Custom Game ID': {
				value: '',
			},
		},
		name: 'gameId',
		required: true,
		style: 'simple',
		type: 'number',
	})
	@ApiTags('game')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	getGame(@Param('gameId') gameId: number): Promise<Game> {
		this.logger.log(`gameId=${gameId}`, ' getGame | MatchlistCtrl ')

		return this.matchlistService.v4GetGame(gameId) as Promise<Game>
	}
}
