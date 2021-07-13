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
	@ApiParam({
		name: 'summonerId',
		type: 'string',
		required: true,
		allowEmptyValue: false,
		description: 'Summoner ID to user during lookup',
		examples: {
			'Custom Summoner ID': {
				value: '',
			},
			'Summoner ID for 0NeveroDDoreveN0': {
				value: 'jzbq0gSuHosYXo4yk1oi0Cs432As65H-0xyaIG2qZuuVi_iY',
			},
		},
		style: 'simple',
	})
	@ApiQuery({
		name: 'withUser',
		type: 'boolean',
		required: false,
		allowEmptyValue: false,
		description:
			'If true, return user data alongside number; otherwise, return simple number alone',
		examples: {
			'Default (not specified)': {
				value: undefined,
			},
			'Request with user data (withUser=true)': {
				value: true,
			},
			'Request without user data (withUser=false)': {
				value: false,
			},
		},
		style: 'simple',
	})
	@ApiTags('mastery', 'total')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async getMasteryTotal(
		@Param('summonerId') summonerId: string,
		@Query('withUser') withUser = false,
	): Promise<number> {
		this.logger.log(
			`summonerId="${summonerId}" withUser=${withUser}`,
			' getMasteryTotal | MatchlistCtrl ',
		)
		const apiKey = this.appService.getRiotToken()

		return this.masteryService.getMasteryTotal(apiKey, summonerId)
	}
}
