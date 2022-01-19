import { ApiProperty } from '@nestjs/swagger'

export class MatchMetadata {
	@ApiProperty()
	dataVersion: string

	@ApiProperty()
	matchId: string

	@ApiProperty()
	participants: string[]

	/**
	 * For more specific information on constants and values, please
	 * visit https://developer.riotgames.com/docs/lol#general_game-constants
	 *
	 * @param dataVersion
	 * @param matchId
	 * @param participants - list of participant puuids
	 */
	constructor(dataVersion: string, matchId: string, participants: string[]) {
		this.dataVersion = dataVersion
		this.matchId = matchId
		this.participants = participants
	}
}
