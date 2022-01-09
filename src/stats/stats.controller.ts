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
	COMMON_QUEUE_TYPES,
	puuidExamples,
	queueTypeExamples,
} from '../constants'
import { CalculatedStats } from '../models/calculated-stats.model'
import { GameV5 } from '../models/v5/game-v5.model'
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
		description: 'Get calculated stats using an puuid',
		summary: 'Get calculated stats using an puuid',
	})
	@ApiQuery({
		allowEmptyValue: false,
		description: 'puuid to search for when parsing game data',
		examples: puuidExamples,
		name: 'puuid',
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
		@Query('puuid') puuid: string,
		@Query('getLastX') getLastX = 10,
		@Query('queueType')
		queueType: keyof typeof COMMON_QUEUE_TYPES = undefined,
	): Promise<CalculatedStats> {
		if (puuid.length < 1) {
			throw new BadRequestException({
				error: true,
				headersRequired: [],
				queryParamsRequired: [
					{
						name: 'puuid',
						type: 'string',
					},
				],
			})
		}

		this.logger.log(
			`puuid=${puuid} getLastX=${getLastX} queueType="${queueType}"`,
			' getSummaryForAccountId | StatsCtrl ',
		)

		const games: GameV5[] = (await this.matchlistService.v5GetMatchlist(
			puuid,
			getLastX,
			queueType,
		)) as GameV5[]

		return this.statsService.calculateGeneralStats(puuid, games)
	}
}
