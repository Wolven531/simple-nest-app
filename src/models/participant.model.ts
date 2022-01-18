import { ApiProperty } from '@nestjs/swagger'

// TODO -
// @ApiExtraModels(PerksDto)
export class Participant {
	@ApiProperty()
	assists: number

	@ApiProperty()
	baronKills: number

	@ApiProperty()
	bountyLevel: number

	@ApiProperty()
	champExperience: number

	@ApiProperty()
	champLevel: number

	@ApiProperty()
	championId: number

	@ApiProperty()
	championName: string

	@ApiProperty()
	championTransform: number

	@ApiProperty()
	consumablesPurchased: number

	@ApiProperty()
	damageDealtToBuildings: number

	@ApiProperty()
	damageDealtToObjectives: number

	@ApiProperty()
	damageDealtToTurrets: number

	@ApiProperty()
	damageSelfMitigated: number

	@ApiProperty()
	deaths: number

	@ApiProperty()
	detectorWardsPlaced: number

	@ApiProperty()
	doubleKills: number

	@ApiProperty()
	dragonKills: number

	@ApiProperty()
	firstBloodAssist: boolean

	@ApiProperty()
	firstBloodKill: boolean

	@ApiProperty()
	firstTowerAssist: boolean

	@ApiProperty()
	firstTowerKill: boolean

	@ApiProperty()
	gameEndedInEarlySurrender: boolean

	@ApiProperty()
	gameEndedInSurrender: boolean

	@ApiProperty()
	goldEarned: number

	@ApiProperty()
	goldSpent: number

	@ApiProperty()
	individualPosition: string

	@ApiProperty()
	inhibitorKills: number

	@ApiProperty()
	inhibitorTakedowns: number

	@ApiProperty()
	inhibitorsLost: number

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
	itemsPurchased: number

	@ApiProperty()
	killingSprees: number

	@ApiProperty()
	kills: number

	@ApiProperty()
	lane: string

	@ApiProperty()
	largestCriticalStrike: number

	@ApiProperty()
	largestKillingSpree: number

	@ApiProperty()
	largestMultiKill: number

	@ApiProperty()
	longestTimeSpentLiving: number

	@ApiProperty()
	magicDamageDealt: number

	@ApiProperty()
	magicDamageDealtToChampions: number

	@ApiProperty()
	magicDamageTaken: number

	@ApiProperty()
	neutralMinionsKilled: number

	@ApiProperty()
	nexusKills: number

	@ApiProperty()
	nexusTakedowns: number

	@ApiProperty()
	nexusLost: number

	@ApiProperty()
	objectivesStolen: number

	@ApiProperty()
	objectivesStolenAssists: number

	@ApiProperty()
	participantId: number

	@ApiProperty()
	pentaKills: number

	@ApiProperty()
	perks: any

	@ApiProperty()
	physicalDamageDealt: number

	@ApiProperty()
	physicalDamageDealtToChampions: number

	@ApiProperty()
	physicalDamageTaken: number

	@ApiProperty()
	profileIcon: number

	@ApiProperty()
	puuid: string

	@ApiProperty()
	quadraKills: number

	@ApiProperty()
	riotIdName: string

	@ApiProperty()
	riotIdTagline: string

	@ApiProperty()
	role: string

	@ApiProperty()
	sightWardsBoughtInGame: number

	@ApiProperty()
	spell1Casts: number

	@ApiProperty()
	spell2Casts: number

	@ApiProperty()
	spell3Casts: number

	@ApiProperty()
	spell4Casts: number

	@ApiProperty()
	summoner1Casts: number

	@ApiProperty()
	summoner1Id: number

	@ApiProperty()
	summoner2Casts: number

	@ApiProperty()
	summoner2Id: number

	@ApiProperty()
	summonerId: string

	@ApiProperty()
	summonerLevel: number

	@ApiProperty()
	summonerName: string

	@ApiProperty()
	teamEarlySurrendered: boolean

	@ApiProperty()
	teamId: number

	@ApiProperty()
	teamPosition: string

	@ApiProperty()
	timeCCingOthers: number

	@ApiProperty()
	timePlayed: number

	@ApiProperty()
	totalDamageDealt: number

	@ApiProperty()
	totalDamageDealtToChampions: number

	@ApiProperty()
	totalDamageShieldedOnTeammates: number

	@ApiProperty()
	totalDamageTaken: number

	@ApiProperty()
	totalHeal: number

	@ApiProperty()
	totalHealsOnTeammates: number

	@ApiProperty()
	totalMinionsKilled: number

	@ApiProperty()
	totalTimeCCDealt: number

	@ApiProperty()
	totalTimeSpentDead: number

	@ApiProperty()
	totalUnitsHealed: number

	@ApiProperty()
	tripleKills: number

	@ApiProperty()
	trueDamageDealt: number

	@ApiProperty()
	trueDamageDealtToChampions: number

	@ApiProperty()
	trueDamageTaken: number

	@ApiProperty()
	turretKills: number

	@ApiProperty()
	turretTakedowns: number

	@ApiProperty()
	turretsLost: number

	@ApiProperty()
	unrealKills: number

	@ApiProperty()
	visionScore: number

	@ApiProperty()
	visionWardsBoughtInGame: number

	@ApiProperty()
	wardsKilled: number

	@ApiProperty()
	wardsPlaced: number

	@ApiProperty()
	win: boolean

	/**
	 * @param assists number
	 * @param baronKills number
	 * @param bountyLevel number
	 * @param champExperience number
	 * @param champLevel number
	 * @param championId number
	 * @param championName string
	 * @param championTransform	int
	 * @param consumablesPurchased number
	 * @param damageDealtToBuildings number
	 * @param damageDealtToObjectives number
	 * @param damageDealtToTurrets number
	 * @param damageSelfMitigated number
	 * @param deaths number
	 * @param detectorWardsPlaced number
	 * @param doubleKills number
	 * @param dragonKills number
	 * @param firstBloodAssist boolean
	 * @param firstBloodKill boolean
	 * @param firstTowerAssist boolean
	 * @param firstTowerKill boolean
	 * @param gameEndedInEarlySurrender boolean
	 * @param gameEndedInSurrender boolean
	 * @param goldEarned number
	 * @param goldSpent number
	 * @param individualPosition string
	 * @param inhibitorKills number
	 * @param inhibitorTakedowns number
	 * @param inhibitorsLost number
	 * @param item0 number
	 * @param item1 number
	 * @param item2 number
	 * @param item3 number
	 * @param item4 number
	 * @param item5 number
	 * @param item6 number
	 * @param itemsPurchased number
	 * @param killingSprees number
	 * @param kills number
	 * @param lane string
	 * @param largestCriticalStrike number
	 * @param largestKillingSpree number
	 * @param largestMultiKill number
	 * @param longestTimeSpentLiving number
	 * @param magicDamageDealt number
	 * @param magicDamageDealtToChampions number
	 * @param magicDamageTaken number
	 * @param neutralMinionsKilled number
	 * @param nexusKills number
	 * @param nexusTakedowns number
	 * @param nexusLost number
	 * @param objectivesStolen number
	 * @param objectivesStolenAssists number
	 * @param participantId number
	 * @param pentaKills number
	 * @param perks	PerksDto
	 * @param physicalDamageDealt number
	 * @param physicalDamageDealtToChampions number
	 * @param physicalDamageTaken number
	 * @param profileIcon number
	 * @param puuid string
	 * @param quadraKills number
	 * @param riotIdName string
	 * @param riotIdTagline string
	 * @param role string
	 * @param sightWardsBoughtInGame number
	 * @param spell1Casts number
	 * @param spell2Casts number
	 * @param spell3Casts number
	 * @param spell4Casts number
	 * @param summoner1Casts number
	 * @param summoner1Id number
	 * @param summoner2Casts number
	 * @param summoner2Id number
	 * @param summonerId string
	 * @param summonerLevel number
	 * @param summonerName string
	 * @param teamEarlySurrendered boolean
	 * @param teamId number
	 * @param teamPosition	string
	 * @param timeCCingOthers number
	 * @param timePlayed number
	 * @param totalDamageDealt number
	 * @param totalDamageDealtToChampions number
	 * @param totalDamageShieldedOnTeammates number
	 * @param totalDamageTaken number
	 * @param totalHeal number
	 * @param totalHealsOnTeammates number
	 * @param totalMinionsKilled number
	 * @param totalTimeCCDealt number
	 * @param totalTimeSpentDead number
	 * @param totalUnitsHealed number
	 * @param tripleKills number
	 * @param trueDamageDealt number
	 * @param trueDamageDealtToChampions number
	 * @param trueDamageTaken number
	 * @param turretKills number
	 * @param turretTakedowns number
	 * @param turretsLost number
	 * @param unrealKills number
	 * @param visionScore number
	 * @param visionWardsBoughtInGame number
	 * @param wardsKilled number
	 * @param wardsPlaced number
	 * @param win boolean
	 */
	constructor(
		assists: number,
		baronKills: number,
		bountyLevel: number,
		champExperience: number,
		champLevel: number,
		championId: number,
		championName: string,
		championTransform: number,
		consumablesPurchased: number,
		damageDealtToBuildings: number,
		damageDealtToObjectives: number,
		damageDealtToTurrets: number,
		damageSelfMitigated: number,
		deaths: number,
		detectorWardsPlaced: number,
		doubleKills: number,
		dragonKills: number,
		firstBloodAssist: boolean,
		firstBloodKill: boolean,
		firstTowerAssist: boolean,
		firstTowerKill: boolean,
		gameEndedInEarlySurrender: boolean,
		gameEndedInSurrender: boolean,
		goldEarned: number,
		goldSpent: number,
		individualPosition: string,
		inhibitorKills: number,
		inhibitorTakedowns: number,
		inhibitorsLost: number,
		item0: number,
		item1: number,
		item2: number,
		item3: number,
		item4: number,
		item5: number,
		item6: number,
		itemsPurchased: number,
		killingSprees: number,
		kills: number,
		lane: string,
		largestCriticalStrike: number,
		largestKillingSpree: number,
		largestMultiKill: number,
		longestTimeSpentLiving: number,
		magicDamageDealt: number,
		magicDamageDealtToChampions: number,
		magicDamageTaken: number,
		neutralMinionsKilled: number,
		nexusKills: number,
		nexusTakedowns: number,
		nexusLost: number,
		objectivesStolen: number,
		objectivesStolenAssists: number,
		participantId: number,
		pentaKills: number,
		// TODO -
		// perks: PerksDto,
		perks: any,
		physicalDamageDealt: number,
		physicalDamageDealtToChampions: number,
		physicalDamageTaken: number,
		profileIcon: number,
		puuid: string,
		quadraKills: number,
		riotIdName: string,
		riotIdTagline: string,
		role: string,
		sightWardsBoughtInGame: number,
		spell1Casts: number,
		spell2Casts: number,
		spell3Casts: number,
		spell4Casts: number,
		summoner1Casts: number,
		summoner1Id: number,
		summoner2Casts: number,
		summoner2Id: number,
		summonerId: string,
		summonerLevel: number,
		summonerName: string,
		teamEarlySurrendered: boolean,
		teamId: number,
		teamPosition: string,
		timeCCingOthers: number,
		timePlayed: number,
		totalDamageDealt: number,
		totalDamageDealtToChampions: number,
		totalDamageShieldedOnTeammates: number,
		totalDamageTaken: number,
		totalHeal: number,
		totalHealsOnTeammates: number,
		totalMinionsKilled: number,
		totalTimeCCDealt: number,
		totalTimeSpentDead: number,
		totalUnitsHealed: number,
		tripleKills: number,
		trueDamageDealt: number,
		trueDamageDealtToChampions: number,
		trueDamageTaken: number,
		turretKills: number,
		turretTakedowns: number,
		turretsLost: number,
		unrealKills: number,
		visionScore: number,
		visionWardsBoughtInGame: number,
		wardsKilled: number,
		wardsPlaced: number,
		win: boolean,
	) {
		this.assists = assists
		this.baronKills = baronKills
		this.bountyLevel = bountyLevel
		this.champExperience = champExperience
		this.champLevel = champLevel
		this.championId = championId
		this.championName = championName
		this.championTransform = championTransform
		this.consumablesPurchased = consumablesPurchased
		this.damageDealtToBuildings = damageDealtToBuildings
		this.damageDealtToObjectives = damageDealtToObjectives
		this.damageDealtToTurrets = damageDealtToTurrets
		this.damageSelfMitigated = damageSelfMitigated
		this.deaths = deaths
		this.detectorWardsPlaced = detectorWardsPlaced
		this.doubleKills = doubleKills
		this.dragonKills = dragonKills
		this.firstBloodAssist = firstBloodAssist
		this.firstBloodKill = firstBloodKill
		this.firstTowerAssist = firstTowerAssist
		this.firstTowerKill = firstTowerKill
		this.gameEndedInEarlySurrender = gameEndedInEarlySurrender
		this.gameEndedInSurrender = gameEndedInSurrender
		this.goldEarned = goldEarned
		this.goldSpent = goldSpent
		this.individualPosition = individualPosition
		this.inhibitorKills = inhibitorKills
		this.inhibitorTakedowns = inhibitorTakedowns
		this.inhibitorsLost = inhibitorsLost
		this.item0 = item0
		this.item1 = item1
		this.item2 = item2
		this.item3 = item3
		this.item4 = item4
		this.item5 = item5
		this.item6 = item6
		this.itemsPurchased = itemsPurchased
		this.killingSprees = killingSprees
		this.kills = kills
		this.lane = lane
		this.largestCriticalStrike = largestCriticalStrike
		this.largestKillingSpree = largestKillingSpree
		this.largestMultiKill = largestMultiKill
		this.longestTimeSpentLiving = longestTimeSpentLiving
		this.magicDamageDealt = magicDamageDealt
		this.magicDamageDealtToChampions = magicDamageDealtToChampions
		this.magicDamageTaken = magicDamageTaken
		this.neutralMinionsKilled = neutralMinionsKilled
		this.nexusKills = nexusKills
		this.nexusTakedowns = nexusTakedowns
		this.nexusLost = nexusLost
		this.objectivesStolen = objectivesStolen
		this.objectivesStolenAssists = objectivesStolenAssists
		this.participantId = participantId
		this.pentaKills = pentaKills
		this.perks = perks
		this.physicalDamageDealt = physicalDamageDealt
		this.physicalDamageDealtToChampions = physicalDamageDealtToChampions
		this.physicalDamageTaken = physicalDamageTaken
		this.profileIcon = profileIcon
		this.puuid = puuid
		this.quadraKills = quadraKills
		this.riotIdName = riotIdName
		this.riotIdTagline = riotIdTagline
		this.role = role
		this.sightWardsBoughtInGame = sightWardsBoughtInGame
		this.spell1Casts = spell1Casts
		this.spell2Casts = spell2Casts
		this.spell3Casts = spell3Casts
		this.spell4Casts = spell4Casts
		this.summoner1Casts = summoner1Casts
		this.summoner1Id = summoner1Id
		this.summoner2Casts = summoner2Casts
		this.summoner2Id = summoner2Id
		this.summonerId = summonerId
		this.summonerLevel = summonerLevel
		this.summonerName = summonerName
		this.teamEarlySurrendered = teamEarlySurrendered
		this.teamId = teamId
		this.teamPosition = teamPosition
		this.timeCCingOthers = timeCCingOthers
		this.timePlayed = timePlayed
		this.totalDamageDealt = totalDamageDealt
		this.totalDamageDealtToChampions = totalDamageDealtToChampions
		this.totalDamageShieldedOnTeammates = totalDamageShieldedOnTeammates
		this.totalDamageTaken = totalDamageTaken
		this.totalHeal = totalHeal
		this.totalHealsOnTeammates = totalHealsOnTeammates
		this.totalMinionsKilled = totalMinionsKilled
		this.totalTimeCCDealt = totalTimeCCDealt
		this.totalTimeSpentDead = totalTimeSpentDead
		this.totalUnitsHealed = totalUnitsHealed
		this.tripleKills = tripleKills
		this.trueDamageDealt = trueDamageDealt
		this.trueDamageDealtToChampions = trueDamageDealtToChampions
		this.trueDamageTaken = trueDamageTaken
		this.turretKills = turretKills
		this.turretTakedowns = turretTakedowns
		this.turretsLost = turretsLost
		this.unrealKills = unrealKills
		this.visionScore = visionScore
		this.visionWardsBoughtInGame = visionWardsBoughtInGame
		this.wardsKilled = wardsKilled
		this.wardsPlaced = wardsPlaced
		this.win = win
	}
}
