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
	Query
} from '@nestjs/common'
import {
	ApiExtraModels,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger'
import { searchKeyExamples, summonerIdExamples } from '../constants'
// import { execFileSync } from 'child_process'
// import { join } from 'path'
import { Summoner } from '../models/summoner.model'
import { User } from '../models/user.model'
import { MasteryService } from '../services/mastery.service'
import { SummonerService } from '../services/summoner.service'
import { UserService } from '../services/user.service'

@ApiTags('user')
@ApiExtraModels(Summoner, User)
@Controller('user')
export class UserController {
	constructor(
		@Inject(MasteryService)
		private readonly masteryService: MasteryService,
		@Inject(SummonerService)
		private readonly summonerService: SummonerService,
		@Inject(UserService)
		private readonly userService: UserService,
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
	@ApiTags('add', 'server')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async addUser(@Param('summonerId') summonerId: string): Promise<User[]> {
		this.logger.debug(`summonerId="${summonerId}"`, ' User-Ctrl | addUser ')

		if (this.userService.users.map((u) => u.summonerId).includes(summonerId)) {
			this.logger.debug(
				'user already in collection, not adding again',
				' User-Ctrl | addUser ',
			)

			return this.userService.users
		}

		const summ = await this.summonerService.getSummonerById(summonerId)

		this.userService.addUser({
			accountId: summ.accountId,
			lastUpdated: summ.revisionDate,
			// TODO - grab value from service
			masteryTotal: 0,
			name: summ.name,
			summonerId,
		} as User)

		this.logger.debug('added user to collection', ' User-Ctrl | addUser ')

		return this.userService.users
	}

	@Get('get/:summonerId')
	@ApiOperation({
		description: 'Search the Riot API for a given Summoner by summoner ID',
		externalDocs: {
			description: 'Riot API User Search Endpoint Docs',
			url: 'https://developer.riotgames.com/apis#summoner-v4/GET_getSummonerById',
		},
		summary: 'Get user details by searching for them using their summoner ID',
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
	@ApiTags('summoner')
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
	@ApiTags('server')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	getUsers(): Promise<User[]> {
		this.logger.debug('', ' User-Ctrl | getUsers ')

		const updatedUsers = Promise.all(
			this.userService.users.map(async (user) => {
				const masteryTotal = await this.masteryService.getMasteryTotal(
					user.summonerId,
				)
				user.lastUpdated = Date.now()
				user.masteryTotal = masteryTotal

				return user
			}),
		)

		return updatedUsers
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
	@ApiTags('name', 'summoner')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	searchSummoners(
		@Query('searchKey') searchKey: string,
	): Promise<Summoner | null> {
		const encodedSearchKey = encodeURI(searchKey)

		this.logger.debug(
			`searchKey="${searchKey}" searchKey encoded="${encodedSearchKey}"`,
			' User-Ctrl | searchSummoners ',
		)

		return this.summonerService.searchByName(encodedSearchKey)
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
