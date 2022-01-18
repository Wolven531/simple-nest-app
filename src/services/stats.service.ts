import { Inject, Injectable, Logger } from '@nestjs/common'
import { CalculatedStats } from '../models/calculated-stats.model'
import { Match } from '../models/match.model'

@Injectable()
export class StatsService {
	constructor(
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	/**
	 * This method iterates a collection of Match objects and calculates general stats
	 *
	 * @param targetPuuid String puuid representing for which User to calculate stats
	 * @param matches Array of Match objects to use when calculating stats
	 *
	 * @returns A CalculatedStats object built using the parameters
	 */
	calculateGeneralStats(
		targetPuuid: string,
		matches: Match[],
	): CalculatedStats {
		const ctx = ' calculateGeneralStats | StatsSvc '

		this.logger.log(
			`About to calc stats for ${matches.length} matches w/ puuid = ${targetPuuid}...`,
			ctx,
		)

		const timePlayedTotal = matches
			.map((g) => g.info.gameDuration)
			.reduce((acc, curr) => acc + curr, 0)
		const timePlayedAvg = timePlayedTotal / matches.length || 0

		let assistsTotal = 0
		let deathsTotal = 0
		let goldEarnedTotal = 0
		let killsTotal = 0
		let visionScoreTotal = 0
		let totalWins = 0

		matches.forEach((m) => {
			const participant = m.info.participants.find(
				(p) => p.puuid === targetPuuid,
			)

			if (!participant) {
				return
			}

			assistsTotal += participant.assists
			deathsTotal += participant.deaths
			goldEarnedTotal += participant.goldEarned
			killsTotal += participant.kills
			visionScoreTotal += participant.visionScore
			totalWins += participant.win ? 1 : 0
		})

		const goldEarnedAvg = goldEarnedTotal / matches.length || 0
		const assistsAvg = assistsTotal / matches.length || 0
		const deathsAvg = deathsTotal / matches.length || 0
		const killsAvg = killsTotal / matches.length || 0
		const kDA = (killsTotal + assistsTotal) / deathsTotal || 0
		const totalLosses = matches.length - totalWins
		const visionScoreAvg = visionScoreTotal / matches.length || 0
		const winPercentage = (totalWins / matches.length || 0) * 100

		return new CalculatedStats(
			matches.length,
			goldEarnedAvg,
			goldEarnedTotal,
			kDA,
			timePlayedAvg,
			timePlayedTotal,
			assistsAvg,
			assistsTotal,
			deathsAvg,
			deathsTotal,
			killsAvg,
			killsTotal,
			totalLosses,
			totalWins,
			winPercentage,
			visionScoreAvg,
			visionScoreTotal,
		)
	}
}
