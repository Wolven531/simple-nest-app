import { TIME_MILLIS_IN_DAY } from '../constants'

import { utc } from 'moment'

import moment from 'moment'

class User {
	/**
	 * @param accountId - Encrypted account ID for the user
	 * @param lastUpdated - UTC Timestamp of the last update run time for the user
	 * @param masteryTotal - Total mastery points the user has earned
	 * @param name - Friendly name of the user
	 * @param summonerId - Simple summoner ID for the user
	 */
	constructor(
		public accountId: string,
		public lastUpdated: number,
		public masteryTotal: number,
		public name: string,
		public summonerId: string,
	) {}

	/**
	 * @returns True if user model has been updated within the last day; false otherwise
	 */
	get isFresh(): boolean {
		const utcNow = utc()
		const diff = utcNow.diff(moment(this.lastUpdated).utc())

		// NOTE: if diff in time is less than or equal to 24 hours (i.e. one day)
		return diff <= TIME_MILLIS_IN_DAY
	}
}

export { User }
