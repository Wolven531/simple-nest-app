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
import { ConfigService } from '@nestjs/config'
import { ApiExtraModels, ApiOperation } from '@nestjs/swagger'
import { ENV_API_KEY, ENV_API_KEY_DEFAULT } from '../constants'
import { MasteryService } from '../services/mastery.service'

@Controller('mastery')
@ApiExtraModels()
export class MasteryController {
	constructor(
		private readonly masteryService: MasteryService,
		private readonly configService: ConfigService,
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
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async getMasteryTotal(
		@Param('summonerId') summonerId: string,
	): Promise<number> {
		this.logger.log(
			`summonerId=${summonerId}`,
			' getMasteryTotal | MatchlistCtrl ',
		)
		const apiKey = this.configService.get(ENV_API_KEY, ENV_API_KEY_DEFAULT)

		return this.masteryService.getMasteryTotal(apiKey, summonerId)
	}
}
