import {
	Controller,
	Get,
	Header,
	HttpCode,
	HttpStatus,
	Inject,
	Logger,
	Param,
	Post,
	Query,
} from '@nestjs/common'
import {
	ApiExtraModels,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger'
import { UserMasteryService } from '../composite/user-mastery.service'
import { searchKeyExamples, summonerIdExamples } from '../constants'
// import { execFileSync } from 'child_process'
// import { join } from 'path'
import { Summoner } from '../models/summoner.model'
import { User } from '../models/user.model'
import { SummonerService } from '../services/summoner.service'

@ApiTags('user')
@ApiExtraModels(Summoner, User)
@Controller('user')
export class UserController {
	constructor(
		@Inject(SummonerService)
		private readonly summonerService: SummonerService,
		@Inject(UserMasteryService)
		private readonly userMasteryService: UserMasteryService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	@Post('add/:summonerId')
	@ApiOperation({
		description:
			'Add a user to the collection of users on the server using their summoner ID',
		summary:
			'Add a user to the collection of users on the server using their summoner ID',
	})
	@ApiParam({
		allowEmptyValue: false,
		description: 'Summoner ID to add',
		examples: {
			'Custom Summoner ID': {
				value: '',
			},
		},
		name: 'summonerId',
		required: true,
		style: 'simple',
		type: 'string',
	})
	@ApiTags('addUser')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async addUser(@Param('summonerId') summonerId: string): Promise<User[]> {
		this.logger.debug(`summonerId="${summonerId}"`, ' User-Ctrl | addUser ')

		const users = await this.userMasteryService.getUsers()

		if (users.map((u) => u.summonerId).includes(summonerId)) {
			this.logger.debug(
				'user already in collection, not adding again',
				' User-Ctrl | addUser ',
			)

			return users
		}

		const summ = await this.summonerService.getSummonerById(summonerId)

		this.userMasteryService.addUser({
			accountId: summ.accountId,
			lastUpdated: new Date(summ.revisionDate),
			// TODO - grab value from service
			masteryTotal: 0,
			name: summ.name,
			summonerId,
		} as User)

		this.logger.debug('added user to collection', ' User-Ctrl | addUser ')

		return this.userMasteryService.getUsers()
	}

	@Get('get/:summonerId')
	@ApiOperation({
		description: 'Search the Riot API for a given Summoner by summoner ID',
		externalDocs: {
			description: 'Riot API User Search Endpoint Docs',
			url: 'https://developer.riotgames.com/apis#summoner-v4/GET_getSummonerById',
		},
		summary:
			'Get user details by searching for them using their summoner ID',
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
	@ApiTags('getSummonerById')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	getSummonerById(
		@Param('summonerId') summonerId: string,
	): Promise<Summoner | null> {
		this.logger.debug(
			`summonerId="${summonerId}"`,
			' User-Ctrl | getSummonerById ',
		)

		return this.summonerService.getSummonerById(summonerId)
	}

	@Get()
	@ApiOperation({
		description: 'Get the current list of users from the server',
		summary: 'Get the current list of users from the server',
	})
	@ApiTags('getUsers')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	getUsers(): Promise<User[]> {
		this.logger.debug('', ' User-Ctrl | getUsers ')

		return this.userMasteryService.getUsersWithMastery()
	}

	@Get('search')
	@ApiOperation({
		description:
			'Search the Riot API for a given searchKey to confirm the existence of a user',
		externalDocs: {
			description: 'Riot API User Search Endpoint Docs',
			url: 'https://developer.riotgames.com/apis#summoner-v4/GET_getBySummonerName',
		},
		summary:
			'Confirm a user exists by searching for them using their summoner name',
	})
	@ApiQuery({
		allowEmptyValue: false,
		description: 'Value to use when searching the Riot API',
		examples: searchKeyExamples,
		name: 'searchKey',
		required: true,
		style: 'simple',
		type: 'string',
	})
	@ApiTags('searchSummoners')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	searchSummoners(
		@Query('searchKey') searchKey: string,
	): Promise<Summoner | null> {
		this.logger.debug(
			`searchKey="${searchKey}"`,
			' User-Ctrl | searchSummoners ',
		)

		return this.userMasteryService.lookupSummonerByFriendlyName(searchKey)
	}

	// @Get('refresh')
	// @HttpCode(HttpStatus.OK)
	// @Header('Cache-Control', 'none')
	// refreshUserData(): Promise<string> {
	// 	this.logger.debug('', ' User-Ctrl | refreshUserData ')

	// 	const dirContainingPackage = join(__dirname, '..', '..')
	// 	this.logger.warn(
	// 		`About to execute script in dir "${dirContainingPackage}" ...`,
	// 		' refreshUserData | user-ctrl ',
	// 	)

	// 	execFileSync('yarn', ['copy:users:windows'], {
	// 		cwd: dirContainingPackage,
	// 		shell: true,
	// 	})

	// 	this.logger.warn('Script completed', ' refreshUserData | user-ctrl ')

	// 	return 'OK'
	// }
}
