import {
	Controller,
	Get,
	Header,
	HttpCode,
	HttpStatus,
	Inject,
	Logger,
	Param,
} from '@nestjs/common'
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AppService } from '../services/app.service'
import { MasteryService } from '../services/mastery.service'

@ApiTags('mastery')
@Controller('mastery')
@ApiExtraModels()
export class MasteryController {
	constructor(
		@Inject(MasteryService)
		private readonly masteryService: MasteryService,
		@Inject(AppService)
		private readonly appService: AppService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	@Get('total/:summonerId')
	@ApiOperation({
		description:
			'Get a total mastery score from the Riot API for a given summonerId',
		externalDocs: {
			description: 'Riot API Get Total Mastery Endpoint Docs',
			url: 'https://developer.riotgames.com/apis#champion-mastery-v4/GET_getChampionMasteryScore',
		},
		summary: 'Get total mastery score for a given summonerId',
		tags: ['mastery', 'summoner', 'summonerId', 'total'],
	})
	@ApiTags('mastery', 'total')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async getMasteryTotal(
		@Param('summonerId') summonerId: string,
	): Promise<number> {
		this.logger.log(
			`summonerId=${summonerId}`,
			' getMasteryTotal | MatchlistCtrl ',
		)
		const apiKey = this.appService.getRiotToken()

		return this.masteryService.getMasteryTotal(apiKey, summonerId)
	}
}
