import { ApiProperty } from '@nestjs/swagger'

class CalculatedStats {
	@ApiProperty()
	gamesCount: number

	@ApiProperty()
	goldEarnedAvg: number

	@ApiProperty()
	goldEarnedTotal: number

	@ApiProperty()
	kDA: number

	@ApiProperty()
	timePlayedAvg: number

	@ApiProperty()
	timePlayedTotal: number

	@ApiProperty()
	assistsAvg: number

	@ApiProperty()
	assistsTotal: number

	@ApiProperty()
	deathsAvg: number

	@ApiProperty()
	deathsTotal: number

	@ApiProperty()
	killsAvg: number

	@ApiProperty()
	killsTotal: number

	@ApiProperty()
	totalLosses: number

	@ApiProperty()
	totalWins: number

	@ApiProperty()
	winPercentage: number

	/**
	 * @param gamesCount - number of games used to calculate the stats in this instance
	 * @param goldEarnedAvg - average amount of gold earned per game
	 * @param goldEarnedTotal - total amount of gold earned across all games
	 * @param kDA - calculated by adding kills and assists and dividing by assists across all games
	 * @param timePlayedAvg - average amount of seconds per game
	 * @param timePlayedTotal - total amount of seconds across all games
	 * @param assistsAvg - average amount of assists earned per game
	 * @param assistsTotal - total amount of assists earned across all games
	 * @param deathsAvg - average amount of deaths earned per game
	 * @param deathsTotal - total amount of deaths earned across all games
	 * @param killsAvg - average amount of kills earned per game
	 * @param killsTotal - total amount of kills earned across all games
	 * @param totalLosses - total number of losses across all games
	 * @param totalWins - total number of wins across all games
	 * @param winPercentage - ratio of wins to total number games
	 */
	constructor(
		gamesCount: number,
		goldEarnedAvg: number,
		goldEarnedTotal: number,
		kDA: number,
		timePlayedAvg: number,
		timePlayedTotal: number,
		assistsAvg: number,
		assistsTotal: number,
		deathsAvg: number,
		deathsTotal: number,
		killsAvg: number,
		killsTotal: number,
		totalLosses: number,
		totalWins: number,
		winPercentage: number,
	) {
		this.gamesCount = gamesCount
		this.goldEarnedAvg = goldEarnedAvg
		this.goldEarnedTotal = goldEarnedTotal
		this.kDA = kDA
		this.timePlayedAvg = timePlayedAvg
		this.timePlayedTotal = timePlayedTotal
		this.assistsAvg = assistsAvg
		this.assistsTotal = assistsTotal
		this.deathsAvg = deathsAvg
		this.deathsTotal = deathsTotal
		this.killsAvg = killsAvg
		this.killsTotal = killsTotal
		this.totalLosses = totalLosses
		this.totalWins = totalWins
		this.winPercentage = winPercentage
	}
}

export { CalculatedStats }
