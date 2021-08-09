import { ApiExtraModels, ApiProperty } from '@nestjs/swagger'
import { Match } from './match.model'

@ApiExtraModels(Match)
class Matchlist {
	@ApiProperty()
	endIndex: number

	@ApiProperty({
		type: [Match],
	})
	matches: Match[]

	@ApiProperty()
	startIndex: number

	@ApiProperty()
	totalGames: number

	/**
	 * @param endIndex - Last index of matches available
	 * @param matches - Array of match objects
	 * @param startIndex - First index of matches available
	 * @param totalGames - Total number of games
	 */
	constructor(
		endIndex: number,
		matches: Match[],
		startIndex: number,
		totalGames: number,
	) {
		this.endIndex = endIndex
		this.matches = matches
		this.startIndex = startIndex
		this.totalGames = totalGames
	}
}

export { Matchlist }
