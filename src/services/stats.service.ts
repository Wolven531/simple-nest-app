import { Inject, Injectable, Logger } from '@nestjs/common'
import { CalculatedStats } from '../models/calculated-stats.model'
import { Game } from '../models/game.model'

@Injectable()
export class StatsService {
	constructor(
		@Inject(Logger)
		private readonly logger: Logger,
	) {}

	/**
	 * This method iterates a collection of Game objects and calculates general stats
	 *
	 * @param targetAccountKey String accountKey representing for which User to calculate stats
	 * @param games Array of Game objects to use when calculating stats
	 *
	 * @returns A CalculatedStats object built using the parameters
	 */
	calculateGeneralStats(
		targetAccountKey: string,
		games: Game[],
	): CalculatedStats {
		const ctx = ' calculateGeneralStats | StatsSvc '

		this.logger.log(
			`About to calc stats for ${games.length} games w/ account = ${targetAccountKey}...`,
			ctx,
		)

		const timePlayedTotal = games
			.map((g) => g.gameDuration)
			.reduce((acc, curr) => acc + curr, 0)
		const timePlayedAvg = timePlayedTotal / games.length || 0

		let assistsTotal = 0
		let deathsTotal = 0
		let goldEarnedTotal = 0
		let killsTotal = 0
		let visionScoreTotal = 0
		let totalWins = 0

		games.forEach((g) => {
			const identity = g.participantIdentities.find(
				(i) => i.player.currentAccountId === targetAccountKey,
			)

			if (!identity) {
				return
			}

			const participant = g.participants.find(
				(p) => p.participantId === identity.participantId,
			)

			if (!participant) {
				return
			}

			assistsTotal += participant.stats.assists
			deathsTotal += participant.stats.deaths
			goldEarnedTotal += participant.stats.goldEarned
			killsTotal += participant.stats.kills
			visionScoreTotal += participant.stats.visionScore
			totalWins += participant.stats.win ? 1 : 0
		})

		const goldEarnedAvg = goldEarnedTotal / games.length || 0
		const assistsAvg = assistsTotal / games.length || 0
		const deathsAvg = deathsTotal / games.length || 0
		const killsAvg = killsTotal / games.length || 0
		const kDA = (killsTotal + assistsTotal) / deathsTotal || 0
		const totalLosses = games.length - totalWins
		const visionScoreAvg = visionScoreTotal / games.length || 0
		const winPercentage = (totalWins / games.length || 0) * 100

		return new CalculatedStats(
			games.length,
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
