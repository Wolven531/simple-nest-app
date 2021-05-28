import { Match } from './match.model'

class Matchlist {
	/**
	 * @param endIndex - Last index of matches available
	 * @param matches - Array of match objects
	 * @param startIndex - First index of matches available
	 * @param totalGames - Total number of games
	 */
	constructor(
		public endIndex: number,
		public matches: Match[],
		public startIndex: number,
		public totalGames: number,
	) {}
}

export { Matchlist }
