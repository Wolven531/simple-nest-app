import { HttpService } from '@nestjs/axios'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { deserializeArray } from 'class-transformer'
import { firstValueFrom } from 'rxjs'
import { REGION } from '../constants'
// import { readFileSync } from 'fs'
// import { join } from 'path'
// import { ENCODING_UTF8 } from '../constants'
import * as usersJsonData from '../data/users.json'
import { Summoner } from '../models/summoner.model'
import { User } from '../models/user.model'
import { AppService } from '../services/app.service'
import { IUserService } from '../types'

@Injectable()
export class UserService implements IUserService {
	// private readonly DIRECTORY_DATA = 'data'
	// private readonly FILENAME_USERS = 'users.json'
	private _users: User[]

	constructor(
		@Inject(AppService)
		private readonly appService: AppService,
		@Inject(HttpService)
		private readonly httpService: HttpService,
		@Inject(Logger)
		private readonly logger: Logger,
	) {
		this.setup()
	}

	/**
	 * This method adds the provided user to the collection of users IN MEMORY ONLY
	 *
	 * @param newUser User instance to add to users collection
	 */
	addUser(newUser: User) {
		this.logger.log(
			`Adding user ${JSON.stringify(newUser)}`,
			' addUser | user-svc ',
		)

		this._users.push(newUser)
	}

	/**
	 * This method uses loadUsersFromFile and a friendlyName parameter to search for a user in the users file
	 *
	 * @param friendlyName String value (case insensitive) to use when searching for a User
	 * @returns The User instance whose name property matches `friendlyName`; undefined if there are no matches
	 */
	async getUserByFriendlyName(
		friendlyName: string,
	): Promise<User | undefined> {
		const searchKey = friendlyName.toLowerCase()

		this.logger.log(
			`Searching for friendlyName = "${searchKey}"`,
			' getUserByFriendlyName | user-svc ',
		)

		return Promise.resolve(
			this._users.find((u) => u.name.toLowerCase() === searchKey),
		)
	}

	async getUsers(): Promise<User[]> {
		return Promise.resolve(this._users)
	}

	async lookupSummonerByFriendlyName(
		friendlyName: string,
	): Promise<Summoner | undefined> {
		const apiKey = this.appService.getRiotToken()

		const encodedSearchKey = encodeURI(friendlyName)

		return firstValueFrom(
			this.httpService.get(
				`https://${REGION}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodedSearchKey}`,
				{
					headers: {
						'Accept-Charset':
							'application/x-www-form-urlencoded; charset=UTF-8',
						'Accept-Language': 'en-US,en;q=0.9',
						'X-Riot-Token': apiKey,
					},
				},
			),
		)
			.then<Summoner>((resp) => {
				if (resp.status === 404) {
					this.logger.log(
						`Could not find summoner with name = "${friendlyName}"`,
						' lookupSummonerByFriendlyName | user-svc ',
					)

					return undefined
				}

				const user: Summoner = resp.data

				this.logger.log(
					`Found summoner ${JSON.stringify(user, null, 4)}`,
					' lookupSummonerByFriendlyName | user-svc ',
				)

				return user
			})
			.catch((err) => {
				this.logger.error(
					`Error while looking up summoner!\n\n${JSON.stringify(
						err,
						null,
						4,
					)}`,
					' lookupSummonerByFriendlyName | user-svc ',
				)

				return undefined
			})
	}

	/**
	 * This method uses either optional provided data or the loadUsersFromFile method to populate the service;
	 * NOTE - overwrites current users value
	 *
	 * @param data Collection of users to use for this service
	 */
	setup(data?: User[]) {
		this._users = data ?? this.loadUsersFromFile()
	}

	/**
	 * This method uses loadUsersFromFile to check whether EVERY user in user file is "fresh" (as opposed to "stale")
	 *
	 * @returns true if for every User in the users file, isFresh === true; false otherwise
	 */
	// isUsersFileFresh(): boolean {
	// 	const loadedUsers = this.loadUsersFromFile()

	// 	this.logger.log(
	// 		`About to check isFresh for ${loadedUsers.length} users...`,
	// 		' isUsersFileFresh | user-svc ',
	// 	)

	// 	return loadedUsers.every((user) => user.isFresh)
	// }

	/**
	 * This method attempts to load the Users stored in the users file
	 *
	 * @returns Array of User objects loaded from file, if load works; empty array otherwise
	 */
	private loadUsersFromFile(): User[] {
		try {
			// can use this rather than direct import
			// const fileContents = readFileSync(
			// 	join(__dirname, '..', this.DIRECTORY_DATA, this.FILENAME_USERS),
			// ).toString(ENCODING_UTF8)

			// this.logger.log(`fileContents=\n\n${fileContents}\n`, ' loadUsersFromFile | user-svc ')
			// this.logger.log(
			// 	`imported data=\n\n${JSON.stringify(usersJsonData)}\n`,
			// 	' loadUsersFromFile | user-svc ',
			// )

			const users: User[] = deserializeArray(
				User,
				JSON.stringify(usersJsonData),
			)

			const serverNow = new Date(Date.now())

			const updatedUsers = users.map((user) => {
				user.lastUpdated = new Date(
					serverNow.getUTCFullYear(),
					serverNow.getUTCMonth(),
					serverNow.getUTCDate(),
					serverNow.getUTCHours(),
					serverNow.getUTCMinutes(),
					serverNow.getUTCSeconds(),
				)

				return user
			})

			this.logger.log(
				`${updatedUsers.length} users loaded from file`,
				' loadUsersFromFile | user-svc ',
			)

			return updatedUsers
		} catch (e) {
			this.logger.error(
				`Failed to load users file; err=\n\n${e}\n`,
				' loadUsersFromFile | user-svc ',
			)
		}
		return []
	}

	/**
	 * This method updates the users file so that subsequent requests have fresh information
	 *
	 * @param updatedUsers Array of User model instances to save as the users file
	 */
	// updateUsersFile(updatedUsers: User[]): void {
	// 	const filepathUsers = join(
	// 		__dirname,
	// 		'..',
	// 		this.DIRECTORY_DATA,
	// 		this.FILENAME_USERS,
	// 	)

	// 	this.logger.log(
	// 		`${updatedUsers.length} users about to be saved to file at "${filepathUsers}"`,
	// 		' updateUsersFile | user-svc ',
	// 	)

	// 	try {
	// 		writeFileSync(
	// 			filepathUsers,
	// 			`${JSON.stringify(updatedUsers, null, '\t')}\n`,
	// 			{
	// 				encoding: ENCODING_UTF8,
	// 				flag: WRITE_CREATE_OR_TRUNCATE,
	// 			},
	// 		)

	// 		this.logger.log(
	// 			`users file updated\n\n${JSON.stringify(updatedUsers, null, 4)}\n`,
	// 			' updateUsersFile | user-svc ',
	// 		)
	// 	} catch (e) {
	// 		this.logger.error(
	// 			`Failed to update users file; err=\n\n${e}\n`,
	// 			' updateUsersFile | user-svc ',
	// 		)
	// 	}
	// }
}
