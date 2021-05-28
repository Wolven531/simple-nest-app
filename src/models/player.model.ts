import { ApiProperty } from '@nestjs/swagger'

class Player {
	@ApiProperty()
	platformId: string

	@ApiProperty()
	accountId: string

	@ApiProperty()
	summonerName: string

	@ApiProperty()
	summonerId: string

	@ApiProperty()
	currentPlatformId: string

	@ApiProperty()
	currentAccountId: string

	@ApiProperty()
	matchHistoryUri: string

	@ApiProperty()
	profileIcon: number

	/**
	 * @param platformId - Original region player exists in (e.g. 'NA')
	 * @param accountId - Original encrypted account ID for player
	 * @param summonerName - Name displayed for player in game
	 * @param summonerId - Simple unique summoner ID for player
	 * @param currentPlatformId - Current region player exists in (equal to `platformId` in most cases)
	 * @param currentAccountId - Current encrypted account ID for player (equal to `accountId` in most cases)
	 * @param matchHistoryUri - Unique URI used to retrieve the match history for player
	 * @param profileIcon - Unique identifier for the icon selected by player
	 */
	constructor(
		platformId: string,
		accountId: string,
		summonerName: string,
		summonerId: string,
		currentPlatformId: string,
		currentAccountId: string,
		matchHistoryUri: string,
		profileIcon: number,
	) {
		this.platformId = platformId
		this.accountId = accountId
		this.summonerName = summonerName
		this.summonerId = summonerId
		this.currentPlatformId = currentPlatformId
		this.currentAccountId = currentAccountId
		this.matchHistoryUri = matchHistoryUri
		this.profileIcon = profileIcon
	}
}

export { Player }
