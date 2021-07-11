import { Inject, Injectable, Logger } from '@nestjs/common'
import { deserializeArray } from 'class-transformer'
// import { readFileSync } from 'fs'
// import { join } from 'path'
// import { ENCODING_UTF8 } from '../constants'
import * as usersJsonData from '../data/users.json'
import { User } from '../models/user.model'

@Injectable()
export class JsonLoaderService {
	private readonly DIRECTORY_DATA = 'data'
	private readonly FILENAME_USERS = 'users.json'

	constructor(
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	/**
	 * This method uses loadUsersFromFile and a friendlyName parameter to search for a user in the users file
	 *
	 * @param friendlyName String value (case insensitive) to use when searching for a User
	 * @returns The User instance whose name property matches `friendlyName`; undefined if there are no matches
	 */
	getUserByFriendlyName(friendlyName: string): User | undefined {
		const searchKey = friendlyName.toLowerCase()
		const users = this.loadUsersFromFile()

		this.logger.log(
			`Searching for friendlyName = "${searchKey}"`,
			' getUserByFriendlyName | json-loader-svc ',
		)

		return users.find((u) => u.name.toLowerCase() === searchKey)
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
	// 		' isUsersFileFresh | json-loader-svc ',
	// 	)

	// 	return loadedUsers.every((user) => user.isFresh)
	// }

	/**
	 * This method attempts to load the Users stored in the users file
	 *
	 * @returns Array of User objects loaded from file, if load works; empty array otherwise
	 */
	loadUsersFromFile(): User[] {
		try {
			// can use this rather than direct import
			// const fileContents = readFileSync(
			// 	join(__dirname, '..', this.DIRECTORY_DATA, this.FILENAME_USERS),
			// ).toString(ENCODING_UTF8)

			// this.logger.log(`fileContents=\n\n${fileContents}\n`, ' loadUsersFromFile | json-loader-svc ')
			// this.logger.log(
			// 	`imported data=\n\n${JSON.stringify(usersJsonData)}\n`,
			// 	' loadUsersFromFile | json-loader-svc ',
			// )

			const users: User[] = deserializeArray(
				User,
				JSON.stringify(usersJsonData),
			)

			this.logger.log(
				`${users.length} users loaded from file`,
				' loadUsersFromFile | json-loader-svc ',
			)

			return users
		} catch (e) {
			this.logger.error(
				`Failed to load users file; err=\n\n${e}\n`,
				' loadUsersFromFile | json-loader-svc ',
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
	// 		' updateUsersFile | json-loader-svc ',
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
	// 			' updateUsersFile | json-loader-svc ',
	// 		)
	// 	} catch (e) {
	// 		this.logger.error(
	// 			`Failed to update users file; err=\n\n${e}\n`,
	// 			' updateUsersFile | json-loader-svc ',
	// 		)
	// 	}
	// }
}
