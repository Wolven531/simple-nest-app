import { ApiProperty } from '@nestjs/swagger'

class Team {
	@ApiProperty()
	teamId: number

	@ApiProperty()
	win: string

	@ApiProperty()
	firstBlood: boolean

	@ApiProperty()
	firstTower: boolean

	@ApiProperty()
	firstInhibitor: boolean

	@ApiProperty()
	firstBaron: boolean

	@ApiProperty()
	firstDragon: boolean

	@ApiProperty()
	firstRiftHerald: boolean

	@ApiProperty()
	towerKills: number

	@ApiProperty()
	inhibitorKills: number

	@ApiProperty()
	baronKills: number

	@ApiProperty()
	dragonKills: number

	@ApiProperty()
	vilemawKills: number

	@ApiProperty()
	riftHeraldKills: number

	@ApiProperty()
	dominionVictoryScore: number

	@ApiProperty()
	bans: any[]

	/**
	 * @param teamId - Team number used in match (i.e. 100, 200)
	 * @param win - Whether the team achieved a victory (e.g. 'Win')
	 * @param firstBlood - True if this team scored the first kill in the match, false otherwise
	 * @param firstTower - True if this team destroyed the first tower in the match, false otherwise
	 * @param firstInhibitor - True if this team destroyed the first inhibitor in the match, false otherwise
	 * @param firstBaron - True if this team scored the first baron monster kill in the match, false otherwise
	 * @param firstDragon - True if this team scored the first dragon monster kill in the match, false otherwise
	 * @param firstRiftHerald - True if this team scored the first rift herald monster kill in the match, false otherwise
	 * @param towerKills - Number of towers this team destroyed in the match
	 * @param inhibitorKills - Number of inhibitors this team destroyed in the match
	 * @param baronKills - Number of baron monster kills this team scored in the match
	 * @param dragonKills - Number of dragon monster kills this team scored in the match
	 * @param vilemawKills - Number of vile maw monster kills this team scored in the match
	 * @param riftHeraldKills - Number of rift herald monster kills this team scored in the match
	 * @param dominionVictoryScore - Score achieved if the match was dominion
	 * @param bans - array of champions banned from the match in pre-match setup
	 */
	constructor(
		teamId: number,
		win: string,
		firstBlood: boolean,
		firstTower: boolean,
		firstInhibitor: boolean,
		firstBaron: boolean,
		firstDragon: boolean,
		firstRiftHerald: boolean,
		towerKills: number,
		inhibitorKills: number,
		baronKills: number,
		dragonKills: number,
		vilemawKills: number,
		riftHeraldKills: number,
		dominionVictoryScore: number,
		bans: any[],
	) {
		this.teamId = teamId
		this.win = win
		this.firstBlood = firstBlood
		this.firstTower = firstTower
		this.firstInhibitor = firstInhibitor
		this.firstBaron = firstBaron
		this.firstDragon = firstDragon
		this.firstRiftHerald = firstRiftHerald
		this.towerKills = towerKills
		this.inhibitorKills = inhibitorKills
		this.baronKills = baronKills
		this.dragonKills = dragonKills
		this.vilemawKills = vilemawKills
		this.riftHeraldKills = riftHeraldKills
		this.dominionVictoryScore = dominionVictoryScore
		this.bans = bans
	}
}

export { Team }
