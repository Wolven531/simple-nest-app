import { ApiProperty } from '@nestjs/swagger'

class Stats {
	@ApiProperty()
	participantId: number

	@ApiProperty()
	win: boolean

	@ApiProperty()
	item0: number

	@ApiProperty()
	item1: number

	@ApiProperty()
	item2: number

	@ApiProperty()
	item3: number

	@ApiProperty()
	item4: number

	@ApiProperty()
	item5: number

	@ApiProperty()
	item6: number

	@ApiProperty()
	kills: number

	@ApiProperty()
	deaths: number

	@ApiProperty()
	assists: number

	@ApiProperty()
	largestKillingSpree: number

	@ApiProperty()
	largestMultiKill: number

	@ApiProperty()
	killingSprees: number

	@ApiProperty()
	longestTimeSpentLiving: number

	@ApiProperty()
	doubleKills: number

	@ApiProperty()
	tripleKills: number

	@ApiProperty()
	quadraKills: number

	@ApiProperty()
	pentaKills: number

	@ApiProperty()
	unrealKills: number

	@ApiProperty()
	totalDamageDealt: number

	@ApiProperty()
	magicDamageDealt: number

	@ApiProperty()
	physicalDamageDealt: number

	@ApiProperty()
	trueDamageDealt: number

	@ApiProperty()
	largestCriticalStrike: number

	@ApiProperty()
	totalDamageDealtToChampions: number

	@ApiProperty()
	magicDamageDealtToChampions: number

	@ApiProperty()
	physicalDamageDealtToChampions: number

	@ApiProperty()
	trueDamageDealtToChampions: number

	@ApiProperty()
	totalHeal: number

	@ApiProperty()
	totalUnitsHealed: number

	@ApiProperty()
	damageSelfMitigated: number

	@ApiProperty()
	damageDealtToObjectives: number

	@ApiProperty()
	damageDealtToTurrets: number

	@ApiProperty()
	visionScore: number

	@ApiProperty()
	timeCCingOthers: number

	@ApiProperty()
	totalDamageTaken: number

	@ApiProperty()
	magicalDamageTaken: number

	@ApiProperty()
	physicalDamageTaken: number

	@ApiProperty()
	trueDamageTaken: number

	@ApiProperty()
	goldEarned: number

	@ApiProperty()
	goldSpent: number

	@ApiProperty()
	turretKills: number

	@ApiProperty()
	inhibitorKills: number

	@ApiProperty()
	totalMinionsKilled: number

	@ApiProperty()
	neutralMinionsKilled: number

	@ApiProperty()
	neutralMinionsKilledTeamJungle: number

	@ApiProperty()
	neutralMinionsKilledEnemyJungle: number

	@ApiProperty()
	totalTimeCrowdControlDealt: number

	@ApiProperty()
	champLevel: number

	@ApiProperty()
	visionWardsBoughtInGame: number

	@ApiProperty()
	sightWardsBoughtInGame: number

	@ApiProperty()
	wardsPlaced: number

	@ApiProperty()
	wardsKilled: number

	@ApiProperty()
	firstBloodKill: boolean

	@ApiProperty()
	firstBloodAssist: boolean

	@ApiProperty()
	firstTowerKill: boolean

	@ApiProperty()
	firstTowerAssist: boolean

	@ApiProperty()
	firstInhibitorKill: boolean

	@ApiProperty()
	firstInhibitorAssist: boolean

	@ApiProperty()
	combatPlayerScore: number

	@ApiProperty()
	objectivePlayerScore: number

	@ApiProperty()
	totalPlayerScore: number

	@ApiProperty()
	totalScoreRank: number

	@ApiProperty()
	playerScore0: number

	@ApiProperty()
	playerScore1: number

	@ApiProperty()
	playerScore2: number

	@ApiProperty()
	playerScore3: number

	@ApiProperty()
	playerScore4: number

	@ApiProperty()
	playerScore5: number

	@ApiProperty()
	playerScore6: number

	@ApiProperty()
	playerScore7: number

	@ApiProperty()
	playerScore8: number

	@ApiProperty()
	playerScore9: number

	@ApiProperty()
	perk0: number

	@ApiProperty()
	perk0Var1: number

	@ApiProperty()
	perk0Var2: number

	@ApiProperty()
	perk0Var3: number

	@ApiProperty()
	perk1: number

	@ApiProperty()
	perk1Var1: number

	@ApiProperty()
	perk1Var2: number

	@ApiProperty()
	perk1Var3: number

	@ApiProperty()
	perk2: number

	@ApiProperty()
	perk2Var1: number

	@ApiProperty()
	perk2Var2: number

	@ApiProperty()
	perk2Var3: number

	@ApiProperty()
	perk3: number

	@ApiProperty()
	perk3Var1: number

	@ApiProperty()
	perk3Var2: number

	@ApiProperty()
	perk3Var3: number

	@ApiProperty()
	perk4: number

	@ApiProperty()
	perk4Var1: number

	@ApiProperty()
	perk4Var2: number

	@ApiProperty()
	perk4Var3: number

	@ApiProperty()
	perk5: number

	@ApiProperty()
	perk5Var1: number

	@ApiProperty()
	perk5Var2: number

	@ApiProperty()
	perk5Var3: number

	@ApiProperty()
	perkPrimaryStyle: number

	@ApiProperty()
	perkSubStyle: number

	@ApiProperty()
	statPerk0: number

	@ApiProperty()
	statPerk1: number

	@ApiProperty()
	statPerk2: number

	constructor(
		participantId: number,
		win: boolean,
		item0: number,
		item1: number,
		item2: number,
		item3: number,
		item4: number,
		item5: number,
		item6: number,
		kills: number,
		deaths: number,
		assists: number,
		largestKillingSpree: number,
		largestMultiKill: number,
		killingSprees: number,
		longestTimeSpentLiving: number,
		doubleKills: number,
		tripleKills: number,
		quadraKills: number,
		pentaKills: number,
		unrealKills: number,
		totalDamageDealt: number,
		magicDamageDealt: number,
		physicalDamageDealt: number,
		trueDamageDealt: number,
		largestCriticalStrike: number,
		totalDamageDealtToChampions: number,
		magicDamageDealtToChampions: number,
		physicalDamageDealtToChampions: number,
		trueDamageDealtToChampions: number,
		totalHeal: number,
		totalUnitsHealed: number,
		damageSelfMitigated: number,
		damageDealtToObjectives: number,
		damageDealtToTurrets: number,
		visionScore: number,
		timeCCingOthers: number,
		totalDamageTaken: number,
		magicalDamageTaken: number,
		physicalDamageTaken: number,
		trueDamageTaken: number,
		goldEarned: number,
		goldSpent: number,
		turretKills: number,
		inhibitorKills: number,
		totalMinionsKilled: number,
		neutralMinionsKilled: number,
		neutralMinionsKilledTeamJungle: number,
		neutralMinionsKilledEnemyJungle: number,
		totalTimeCrowdControlDealt: number,
		champLevel: number,
		visionWardsBoughtInGame: number,
		sightWardsBoughtInGame: number,
		wardsPlaced: number,
		wardsKilled: number,
		firstBloodKill: boolean,
		firstBloodAssist: boolean,
		firstTowerKill: boolean,
		firstTowerAssist: boolean,
		firstInhibitorKill: boolean,
		firstInhibitorAssist: boolean,
		combatPlayerScore: number,
		objectivePlayerScore: number,
		totalPlayerScore: number,
		totalScoreRank: number,
		playerScore0: number,
		playerScore1: number,
		playerScore2: number,
		playerScore3: number,
		playerScore4: number,
		playerScore5: number,
		playerScore6: number,
		playerScore7: number,
		playerScore8: number,
		playerScore9: number,
		perk0: number,
		perk0Var1: number,
		perk0Var2: number,
		perk0Var3: number,
		perk1: number,
		perk1Var1: number,
		perk1Var2: number,
		perk1Var3: number,
		perk2: number,
		perk2Var1: number,
		perk2Var2: number,
		perk2Var3: number,
		perk3: number,
		perk3Var1: number,
		perk3Var2: number,
		perk3Var3: number,
		perk4: number,
		perk4Var1: number,
		perk4Var2: number,
		perk4Var3: number,
		perk5: number,
		perk5Var1: number,
		perk5Var2: number,
		perk5Var3: number,
		perkPrimaryStyle: number,
		perkSubStyle: number,
		statPerk0: number,
		statPerk1: number,
		statPerk2: number,
	) {
		this.participantId = participantId
		this.win = win
		this.item0 = item0
		this.item1 = item1
		this.item2 = item2
		this.item3 = item3
		this.item4 = item4
		this.item5 = item5
		this.item6 = item6
		this.kills = kills
		this.deaths = deaths
		this.assists = assists
		this.largestKillingSpree = largestKillingSpree
		this.largestMultiKill = largestMultiKill
		this.killingSprees = killingSprees
		this.longestTimeSpentLiving = longestTimeSpentLiving
		this.doubleKills = doubleKills
		this.tripleKills = tripleKills
		this.quadraKills = quadraKills
		this.pentaKills = pentaKills
		this.unrealKills = unrealKills
		this.totalDamageDealt = totalDamageDealt
		this.magicDamageDealt = magicDamageDealt
		this.physicalDamageDealt = physicalDamageDealt
		this.trueDamageDealt = trueDamageDealt
		this.largestCriticalStrike = largestCriticalStrike
		this.totalDamageDealtToChampions = totalDamageDealtToChampions
		this.magicDamageDealtToChampions = magicDamageDealtToChampions
		this.physicalDamageDealtToChampions = physicalDamageDealtToChampions
		this.trueDamageDealtToChampions = trueDamageDealtToChampions
		this.totalHeal = totalHeal
		this.totalUnitsHealed = totalUnitsHealed
		this.damageSelfMitigated = damageSelfMitigated
		this.damageDealtToObjectives = damageDealtToObjectives
		this.damageDealtToTurrets = damageDealtToTurrets
		this.visionScore = visionScore
		this.timeCCingOthers = timeCCingOthers
		this.totalDamageTaken = totalDamageTaken
		this.magicalDamageTaken = magicalDamageTaken
		this.physicalDamageTaken = physicalDamageTaken
		this.trueDamageTaken = trueDamageTaken
		this.goldEarned = goldEarned
		this.goldSpent = goldSpent
		this.turretKills = turretKills
		this.inhibitorKills = inhibitorKills
		this.totalMinionsKilled = totalMinionsKilled
		this.neutralMinionsKilled = neutralMinionsKilled
		this.neutralMinionsKilledTeamJungle = neutralMinionsKilledTeamJungle
		this.neutralMinionsKilledEnemyJungle = neutralMinionsKilledEnemyJungle
		this.totalTimeCrowdControlDealt = totalTimeCrowdControlDealt
		this.champLevel = champLevel
		this.visionWardsBoughtInGame = visionWardsBoughtInGame
		this.sightWardsBoughtInGame = sightWardsBoughtInGame
		this.wardsPlaced = wardsPlaced
		this.wardsKilled = wardsKilled
		this.firstBloodKill = firstBloodKill
		this.firstBloodAssist = firstBloodAssist
		this.firstTowerKill = firstTowerKill
		this.firstTowerAssist = firstTowerAssist
		this.firstInhibitorKill = firstInhibitorKill
		this.firstInhibitorAssist = firstInhibitorAssist
		this.combatPlayerScore = combatPlayerScore
		this.objectivePlayerScore = objectivePlayerScore
		this.totalPlayerScore = totalPlayerScore
		this.totalScoreRank = totalScoreRank
		this.playerScore0 = playerScore0
		this.playerScore1 = playerScore1
		this.playerScore2 = playerScore2
		this.playerScore3 = playerScore3
		this.playerScore4 = playerScore4
		this.playerScore5 = playerScore5
		this.playerScore6 = playerScore6
		this.playerScore7 = playerScore7
		this.playerScore8 = playerScore8
		this.playerScore9 = playerScore9
		this.perk0 = perk0
		this.perk0Var1 = perk0Var1
		this.perk0Var2 = perk0Var2
		this.perk0Var3 = perk0Var3
		this.perk1 = perk1
		this.perk1Var1 = perk1Var1
		this.perk1Var2 = perk1Var2
		this.perk1Var3 = perk1Var3
		this.perk2 = perk2
		this.perk2Var1 = perk2Var1
		this.perk2Var2 = perk2Var2
		this.perk2Var3 = perk2Var3
		this.perk3 = perk3
		this.perk3Var1 = perk3Var1
		this.perk3Var2 = perk3Var2
		this.perk3Var3 = perk3Var3
		this.perk4 = perk4
		this.perk4Var1 = perk4Var1
		this.perk4Var2 = perk4Var2
		this.perk4Var3 = perk4Var3
		this.perk5 = perk5
		this.perk5Var1 = perk5Var1
		this.perk5Var2 = perk5Var2
		this.perk5Var3 = perk5Var3
		this.perkPrimaryStyle = perkPrimaryStyle
		this.perkSubStyle = perkSubStyle
		this.statPerk0 = statPerk0
		this.statPerk1 = statPerk1
		this.statPerk2 = statPerk2
	}
}

export { Stats }
