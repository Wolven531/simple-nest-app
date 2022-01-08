import { User } from '../models/user.model'

export interface IUserService {
	// NOTE - current interface
	addUser: (newUser: User) => void
	getUserByFriendlyName: (friendlyName: string) => Promise<User | undefined>
	getUsers: () => Promise<User[]>
	lookupUserByFriendlyName: (
		friendlyName: string,
	) => Promise<User | undefined>
	setup: (data?: User[]) => void

	// NOTE - future / async methods
	// addUser: (newUser: User) => Promise<void>
	// setup: (data?: User[]) => Promise<void>

	// NOTE - former property
	// get users(): User[]
}
