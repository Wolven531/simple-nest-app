import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import moment, { utc } from 'moment'
import { TIME_MILLIS_IN_DAY } from '../constants'

@ObjectType()
export class User {
	@Field()
	@ApiProperty()
	accountId: string

	@Field((type) => Int)
	@ApiProperty()
	lastUpdated: number

	@Field((type) => Int)
	@ApiProperty()
	masteryTotal: number

	@Field()
	@ApiProperty()
	name: string

	@Field()
	@ApiProperty()
	summonerId: string

	/**
	 * @param accountId - Encrypted account ID for the user
	 * @param lastUpdated - UTC Timestamp of the last update run time for the user
	 * @param masteryTotal - Total mastery points the user has earned
	 * @param name - Friendly name of the user
	 * @param summonerId - Simple summoner ID for the user
	 */
	constructor(
		accountId: string,
		lastUpdated: number,
		masteryTotal: number,
		name: string,
		summonerId: string,
	) {
		this.accountId = accountId
		this.lastUpdated = lastUpdated
		this.masteryTotal = masteryTotal
		this.name = name
		this.summonerId = summonerId
	}

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
