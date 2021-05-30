import { Summoner } from '../models/summoner.model'
// import { User } from '../models/user.model'
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
// import { execFileSync } from 'child_process'
// import { join } from 'path'
import { SummonerService } from '../services/summoner.service'
// import { JsonLoaderService } from '../services/json-loader.service'

@Controller('user')
export class UserController {
	constructor(
		// private readonly jsonService: JsonLoaderService,
		private readonly summonerService: SummonerService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	// @Get()
	// @HttpCode(HttpStatus.OK)
	// @Header('Cache-Control', 'none')
	// async getUsers(): Promise<User[]> {
	// 	this.logger.debug('', ' User-Ctrl | getUsers ')

	// 	return this.jsonService.loadUsersFromFile()
	// }

	@Get('search')
	@HttpCode(HttpStatus.OK)
	@Header('Cache-Control', 'none')
	async searchUsers(
		@Param('searchKey') searchKey: string,
	): Promise<Summoner | null> {
		this.logger.debug('', ' User-Ctrl | searchUsers ')

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
