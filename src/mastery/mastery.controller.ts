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
import { summonerIdExamples } from '../constants'
import { ChampionMastery } from '../models/champion-mastery.model'
import { Summoner } from '../models/summoner.model'
import { MasteryService } from '../services/mastery.service'
import { SummonerService } from '../services/summoner.service'

export type SummonerWithMastery = Summoner & { masteryTotal: number }

@ApiTags('mastery')
@ApiExtraModels(ChampionMastery, Summoner)
@Controller('mastery')
export class MasteryController {
	constructor(
		@Inject(MasteryService)
		private readonly masteryService: MasteryService,
		@Inject(SummonerService)
		private readonly summonerService: SummonerService,
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
	})
	@ApiParam({
		allowEmptyValue: false,
		description: 'Summoner ID to use during lookup',
		examples: summonerIdExamples,
		name: 'summonerId',
		required: true,
		style: 'simple',
		type: 'string',
	})
	@ApiQuery({
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
		name: 'withUser',
		required: false,
		style: 'simple',
		type: 'boolean',
	})
	@ApiTags('summoner', 'total')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async getMasteryTotal(
		@Param('summonerId') summonerId: string,
		@Query('withUser') withUser = false,
	): Promise<number | SummonerWithMastery> {
		this.logger.log(
			`summonerId="${summonerId}" withUser=${withUser}`,
			' getMasteryTotal | MatchlistCtrl ',
		)

		const masteryTotal = await this.masteryService.getMasteryTotal(
			summonerId,
		)

		if (!withUser) {
			return masteryTotal
		}

		const summoner = await this.summonerService.getSummonerById(summonerId)

		return {
			...summoner,
			masteryTotal,
		}
	}

	@Get('champs/:summonerId')
	@ApiOperation({
		description:
			'Get a list of mastery scores for each champion from the Riot API for a given summonerId',
		externalDocs: {
			description: 'Riot API Get All Champion Masteries Endpoint Docs',
			url: 'https://developer.riotgames.com/apis#champion-mastery-v4/GET_getAllChampionMasteries',
		},
		summary: 'Get all champion masteries for a given summonerId',
	})
	@ApiParam({
		allowEmptyValue: false,
		description: 'Summoner ID to use during lookup',
		examples: summonerIdExamples,
		name: 'summonerId',
		required: true,
		style: 'simple',
		type: 'string',
	})
	// @ApiQuery({
	// 	allowEmptyValue: false,
	// 	description:
	// 		'If true, return user data alongside number; otherwise, return simple number alone',
	// 	examples: {
	// 		'Default (not specified)': {
	// 			value: undefined,
	// 		},
	// 		'Request with user data (withUser=true)': {
	// 			value: true,
	// 		},
	// 		'Request without user data (withUser=false)': {
	// 			value: false,
	// 		},
	// 	},
	// 	name: 'withUser',
	// 	required: false,
	// 	style: 'simple',
	// 	type: 'boolean',
	// })
	@ApiTags('summoner', 'champions')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async getAllChampionMasteries(
		@Param('summonerId') summonerId: string,
		// @Query('withUser') withUser = false,
	): Promise<ChampionMastery[]> {
		this.logger.log(
			`summonerId="${summonerId}"`,
			' getAllChampionMasteries | MatchlistCtrl ',
		)

		const championMasteries =
			await this.masteryService.getAllChampionMasteries(summonerId)

		return championMasteries

		// if (!withUser) {
		// 	return masteryTotal
		// }

		// const summoner = await this.summonerService.getSummonerById(summonerId)

		// return {
		// 	...summoner,
		// 	masteryTotal,
		// }
	}
}
