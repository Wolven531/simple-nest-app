import { ApiProperty } from '@nestjs/swagger'

class ChampionMastery {
	@ApiProperty()
	championId: number

	@ApiProperty()
	championLevel: number

	@ApiProperty()
	championPoints: number

	@ApiProperty()
	championPointsSinceLastLevel: number

	@ApiProperty()
	championPointsUntilNextLevel: number

	@ApiProperty()
	chestGranted: boolean

	@ApiProperty()
	lastPlayTime: number

	@ApiProperty()
	summonerId: string

	@ApiProperty()
	tokensEarned: number

	/**
	 * @param championId - Champion ID for this entry
	 * @param championLevel - Champion level for specified player and champion combination
	 * @param championPoints - Total number of champion points for this player and champion combination - they are used to determine championLevel
	 * @param championPointsSinceLastLevel - Number of points earned since current level has been achieved
	 * @param championPointsUntilNextLevel - Number of points needed to achieve next level. Zero if player reached maximum champion level for this champion
	 * @param chestGranted - Is chest granted for this champion or not in current season
	 * @param lastPlayTime - Last time this champion was played by this player - in Unix milliseconds time format
	 * @param summonerId - Summoner ID for this entry. (Encrypted)
	 * @param tokensEarned - The token earned for this champion at the current championLevel. When the championLevel is advanced the tokensEarned resets to 0
	 */
	constructor(
		championId: number,
		championLevel: number,
		championPoints: number,
		championPointsSinceLastLevel: number,
		championPointsUntilNextLevel: number,
		chestGranted: boolean,
		lastPlayTime: number,
		summonerId: string,
		tokensEarned: number,
	) {
		this.championId = championId
		this.championLevel = championLevel
		this.championPoints = championPoints
		this.championPointsSinceLastLevel = championPointsSinceLastLevel
		this.championPointsUntilNextLevel = championPointsUntilNextLevel
		this.chestGranted = chestGranted
		this.lastPlayTime = lastPlayTime
		this.summonerId = summonerId
		this.tokensEarned = tokensEarned
	}
}

export { ChampionMastery }
