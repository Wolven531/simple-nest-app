import { ApiProperty } from '@nestjs/swagger'

/**
 * @summary Represents a summoner
 */
class Summoner {
	@ApiProperty({
		description: 'Encrypted account ID. Max length 56 characters',
		maxLength: 56,
	})
	accountId: string

	@ApiProperty({
		description: 'Encrypted summoner ID. Max length 63 characters',
		maxLength: 63,
	})
	id: string

	@ApiProperty({
		description: 'Summoner name',
	})
	name: string

	@ApiProperty({
		description: 'ID of the summoner icon associated with the summoner',
	})
	profileIconId: number

	@ApiProperty({
		description: 'Encrypted PUUID. Exact length of 78 characters',
		maxLength: 78,
		minLength: 78,
	})
	puuid: string

	@ApiProperty({
		description: 'Date summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: summoner name change, summoner level change, or profile icon change',
	})
	revisionDate: number

	@ApiProperty({
		description: 'Summoner level associated with the summoner',
	})
	summonerLevel: number

	/**
	 * @param accountId - Encrypted account ID. Max length 56 characters
	 * @param id - Encrypted summoner ID. Max length 63 characters
	 * @param name - Summoner name
	 * @param profileIconId - ID of the summoner icon associated with the summoner
	 * @param puuid - Encrypted PUUID. Exact length of 78 characters
	 * @param revisionDate - Date summoner was last modified specified as epoch milliseconds. The following events
	 *   will update this timestamp: summoner name change, summoner level change, or profile icon change
	 * @param summonerLevel - Summoner level associated with the summoner
	 */
	constructor(
		accountId: string,
		id: string,
		name: string,
		profileIconId: number,
		puuid: string,
		revisionDate: number,
		summonerLevel: number,
	) {
		this.accountId = accountId
		this.id = id
		this.name = name
		this.profileIconId = profileIconId
		this.puuid = puuid
		this.revisionDate = revisionDate
		this.summonerLevel = summonerLevel
	}
}

export { Summoner }
