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
import { CalculatedStats } from '../models/calculated-stats.model'
import { Game } from '../models/game.model'
import { AppService } from '../services/app.service'
import { MatchlistService } from '../services/matchlist.service'
import { StatsService } from '../services/stats.service'

@Controller('stats')
export class StatsController {
	constructor(
		private readonly matchlistService: MatchlistService,
		private readonly appService: AppService,
		private readonly statsService: StatsService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	@Get('summary')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async getSummary(
		@Query('accountId') accountId: string | undefined,
		@Query('getLastX') getLastX: number | undefined,
		@Query('includeGameData') includeGameData = false,
	): Promise<CalculatedStats> {
		if (!accountId || accountId.length < 1) {
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
			`accountId=${accountId} getLastX=${getLastX} includeGameData=${includeGameData}`,
			' getSummary | StatsCtrl ',
		)

		const apiKey = this.appService.getRiotToken()

		const matches = await this.matchlistService.getMatchlist(
			apiKey,
			accountId,
			getLastX,
			includeGameData,
		)

		return this.statsService.calculateGeneralStats(accountId, matches as Game[])
	}
}
