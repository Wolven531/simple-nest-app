import {
	BadRequestException,
	Controller,
	Get,
	Header,
	HttpCode,
	HttpStatus,
	Inject,
	Logger,
	Query,
} from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import * as usersJsonData from '../data/users.json'
import { CalculatedStats } from '../models/calculated-stats.model'
import { Game } from '../models/game.model'
import { MatchlistService } from '../services/matchlist.service'
import { StatsService } from '../services/stats.service'

// TODO - move this to util file
// setup account examples based on user data
const accountIdExamples: any = {}
accountIdExamples['Custom Account ID'] = { value: '' }
usersJsonData.forEach((user) => {
	accountIdExamples[`Account ID for ${user.name}`] = {
		value: user.accountId,
	}
})

@ApiTags('stats')
@Controller('stats')
export class StatsController {
	constructor(
		@Inject(MatchlistService)
		private readonly matchlistService: MatchlistService,
		@Inject(StatsService)
		private readonly statsService: StatsService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	@Get('summary')
	@ApiOperation({
		description: 'Get calculated stats using an account ID',
		summary: 'Get calculated stats using an account ID',
	})
	@ApiQuery({
		allowEmptyValue: false,
		description: 'accountId to search for when parsing game data',
		examples: accountIdExamples,
		name: 'accountId',
		required: true,
		style: 'simple',
		type: 'string',
	})
	@ApiQuery({
		allowEmptyValue: false,
		description: 'Number of games to retrieve for parsing; 10 by default',
		examples: {
			'Default - Ten (10) Games': {
				value: 10,
			},
			'Custom Number of Games': {
				value: '',
			},
			'One (1) Game': {
				value: 1,
			},
			'Three (3) Games': {
				value: 3,
			},
			'Five (5) Games': {
				value: 5,
			},
		},
		name: 'getLastX',
		required: false,
		style: 'simple',
		type: 'number',
	})
	// @ApiQuery({
	// 	allowEmptyValue: false,
	// 	description: 'accountId to search for when parsing game data',
	// 	examples: accountIdExamples,
	// 	name: 'accountId',
	// 	required: false,
	// 	style: 'simple',
	// 	type: 'boolean',
	// })
	@ApiTags('summary')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async getSummaryForAccountId(
		@Query('accountId') accountId: string,
		@Query('getLastX') getLastX = 10,
		// @Query('includeGameData') includeGameData = false,
	): Promise<CalculatedStats> {
		if (accountId.length < 1) {
			throw new BadRequestException({
				error: true,
				headersRequired: [],
				queryParamsRequired: [
					{
						name: 'accountId',
						type: 'string',
					},
				],
			})
		}

		this.logger.log(
			`accountId=${accountId} getLastX=${getLastX}`,
			' getSummaryForAccountId | StatsCtrl ',
		)

		const games: Game[] = (await this.matchlistService.v4GetMatchlist(
			accountId,
			getLastX,
			true,
		)) as Game[]

		return this.statsService.calculateGeneralStats(accountId, games)
	}
}
