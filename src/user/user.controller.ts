import {
	Controller,
	Get,
	Header,
	HttpCode,
	HttpStatus,
	Inject,
	Logger,
	Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
// import { execFileSync } from 'child_process'
// import { join } from 'path'
import { Summoner } from '../models/summoner.model'
import { User } from '../models/user.model'
import { JsonLoaderService } from '../services/json-loader.service'
import { SummonerService } from '../services/summoner.service'

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(
		@Inject(JsonLoaderService)
		private readonly jsonService: JsonLoaderService,
		@Inject(SummonerService)
		private readonly summonerService: SummonerService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	@ApiTags('users')
	@Get()
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async getUsers(): Promise<User[]> {
		this.logger.debug('', ' User-Ctrl | getUsers ')

		return this.jsonService.loadUsersFromFile()
	}

	@ApiTags('user', 'search')
	@Get('search')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async searchUsers(
		// @Param('searchKey') searchKey: string,
		@Query('searchKey') searchKey: string,
	): Promise<Summoner | null> {
		this.logger.debug(`searchKey="${searchKey}"`, ' User-Ctrl | searchUsers ')

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
