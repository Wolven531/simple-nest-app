import { Game } from '../models/game.model'
import { Match } from '../models/match.model'
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
import { ConfigService } from '@nestjs/config'
import { ApiExtraModels, ApiOperation } from '@nestjs/swagger'
import { ENV_API_KEY, ENV_API_KEY_DEFAULT } from '../constants'
import { MatchlistService } from '../services/matchlist.service'

@Controller('matchlist')
@ApiExtraModels(Game, Match)
export class MatchlistController {
	constructor(
		private readonly matchlistService: MatchlistService,
		private readonly configService: ConfigService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	@Get(':accountId')
	@ApiOperation({
		description:
			'Get a list of matches from the Riot API for a given accountId',
		externalDocs: {
			description: 'Riot API Get Matchlist Endpoint Docs',
			url: 'https://developer.riotgames.com/apis#match-v4/GET_getMatchlist',
		},
		summary: 'Get matches for a given accountId',
	})
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async getMatchlist(
		@Param('accountId') accountId: string,
		@Query('getLastX') getLastX: number | undefined,
		@Query('includeGameData') includeGameData = false,
	): Promise<Match[] | Game[]> {
		this.logger.log(
			`accountId=${accountId} getLastX=${getLastX} includeGameData=${includeGameData}`,
			' getMatchlist | MatchlistCtrl ',
		)
		const apiKey = this.configService.get(ENV_API_KEY, ENV_API_KEY_DEFAULT)

		return this.matchlistService.getMatchlist(
			apiKey,
			accountId,
			getLastX,
			includeGameData,
		)
	}

	@Get('game/:gameId')
	@ApiOperation({
		externalDocs: {
			description: 'Riot API Get Match Endpoint Docs',
			url: 'https://developer.riotgames.com/apis#match-v4/GET_getMatch',
		},
		summary: 'Gets a game from the Riot API',
		// parameters: [
		// 	{
		// 		allowEmptyValue: false,
		// 		description: '',
		// 		example: '',
		// 		name: 'apiKey',
		// 		required: true,
		// 		schema: {
		// 			type: 'string',

		// 		},
		// 	},
		// 	{}
		// ]
	})
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async getGame(@Param('gameId') gameId: number): Promise<Game> {
		this.logger.log(`gameId=${gameId}`, ' getGame | MatchlistCtrl ')
		const apiKey = this.configService.get(ENV_API_KEY, ENV_API_KEY_DEFAULT)

		return this.matchlistService.getGame(apiKey, gameId) as Promise<Game>
	}
}
