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
import {
	ApiExtraModels,
	ApiOperation,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger'
import {
	accountIdExamples,
	COMMON_QUEUE_TYPES,
	queueTypeExamples,
} from '../constants'
import { CalculatedStats } from '../models/calculated-stats.model'
import { Game } from '../models/game.model'
import { MatchlistService } from '../services/matchlist.service'
import { StatsService } from '../services/stats.service'

@ApiTags('stats')
@ApiExtraModels(CalculatedStats)
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
	@ApiTags('summary')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async getSummaryForAccountId(
		@Query('accountId') accountId: string,
		@Query('getLastX') getLastX = 10,
		@Query('queueType')
		queueType: keyof typeof COMMON_QUEUE_TYPES = undefined,
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
			`accountId=${accountId} getLastX=${getLastX} queueType="${queueType}"`,
			' getSummaryForAccountId | StatsCtrl ',
		)

		const games: Game[] = (await this.matchlistService.v4GetMatchlist(
			accountId,
			getLastX,
			true,
			queueType,
		)) as Game[]

		return this.statsService.calculateGeneralStats(accountId, games)
	}
}
