import { ApiProperty } from '@nestjs/swagger'

class Match {
	/**
	 * For more specific information on constants and values, please
	 * visit https://developer.riotgames.com/docs/lol#general_game-constants
	 *
	 * @param gameId - Uniue ID for the game played
	 * @param role - Calculated value of the role played in game (e.g. "NONE", "DUO_SUPPORT", "DUO")
	 * @param season - Season of League the game was played in
	 * @param platformId - Region the game was playe in (e.g. "NA1")
	 * @param champion - ID of the champ played in game
	 * @param queue - Which queue the game was launched from
	 * @param lane - Calculated value of the lane played in game (e.g. "NONE, "BOTTOM, "JUNGLE")
	 * @param timestamp - Timestamp of when the game began
	 */
	constructor(
		gameId: number,
		role: string,
		season: number,
		platformId: string,
		champion: number,
		queue: number,
		lane: string,
		timestamp: number,
	) {
		this.gameId = gameId
		this.role = role
		this.season = season
		this.platformId = platformId
		this.champion = champion
		this.queue = queue
		this.lane = lane
		this.timestamp = timestamp
	}

	@ApiProperty()
	champion: number

	@ApiProperty()
	gameId: number

	@ApiProperty()
	lane: string

	@ApiProperty()
	platformId: string

	@ApiProperty()
	queue: number

	@ApiProperty()
	role: string

	@ApiProperty()
	season: number

	@ApiProperty()
	timestamp: number
}

export { Match }
