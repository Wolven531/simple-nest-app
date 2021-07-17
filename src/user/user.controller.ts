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
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
// import { execFileSync } from 'child_process'
// import { join } from 'path'
import { Summoner } from '../models/summoner.model'
import { User } from '../models/user.model'
import { SummonerService } from '../services/summoner.service'
import { UserService } from '../services/user.service'

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(
		@Inject(UserService)
		private readonly userService: UserService,
		@Inject(SummonerService)
		private readonly summonerService: SummonerService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

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
		examples: {
			'Custom Summoner ID': {
				value: '',
			},
			'Summoner ID for 0NeveroDDoreveN0': {
				value: 'jzbq0gSuHosYXo4yk1oi0Cs432As65H-0xyaIG2qZuuVi_iY',
			},
		},
		name: 'summonerId',
		required: true,
		style: 'simple',
		type: 'string',
	})
	@ApiTags('summoner', 'summonerId')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async getSummonerById(
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
	@ApiTags('server', 'user')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async getUsers(): Promise<User[]> {
		this.logger.debug('', ' User-Ctrl | getUsers ')

		return this.userService.users
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
		examples: {
			'Custom searchKey': {
				value: '',
			},
			'Search for 0NeveroDDoreveN0': {
				value: '0NeveroDDoreveN0',
			},
		},
		name: 'searchKey',
		required: true,
		style: 'simple',
		type: 'string',
	})
	@ApiTags('name', 'summoner')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async searchSummoners(
		@Query('searchKey') searchKey: string,
	): Promise<Summoner | null> {
		this.logger.debug(
			`searchKey="${searchKey}"`,
			' User-Ctrl | searchSummoners ',
		)

		return this.summonerService.searchByName(searchKey)
	}

	// @Get('refresh')
	// @HttpCode(HttpStatus.OK)
	// @Header('Cache-Control', 'none')
	// async refreshUserData(): Promise<string> {
	// 	this.logger.debug('', ' User-Ctrl | refreshUserData ')

	// 	const dirContainingPackage = join(__dirname, '..', '..')
	// 	this.logger.warn(
	// 		`About to execute script in dir "${dirContainingPackage}" ...`,
	// 		' refreshUserData | user-ctrl ',
	// 	)

	// 	execFileSync('npm', ['run', 'copy:users:windows'], {
	// 		cwd: dirContainingPackage,
	// 		shell: true,
	// 	})

	// 	this.logger.warn('Script completed', ' refreshUserData | user-ctrl ')

	// 	return 'OK'
	// }
}
