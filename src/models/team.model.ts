import { ApiExtraModels, ApiProperty } from '@nestjs/swagger'
import { Ban } from './ban.model'
import { Objectives } from './objectives.model'

@ApiExtraModels(Ban, Objectives)
export class Team {
	@ApiProperty({
		type: [Ban],
	})
	bans: Ban[]

	@ApiProperty({
		type: Objectives,
	})
	objectives: Objectives

	@ApiProperty()
	teamId: number

	@ApiProperty()
	win: boolean

	/**
	 * @param bans - array of champions banned from the match in pre-match setup
	 * @param objectives
	 * @param teamId - Team number used in match (i.e. 100, 200)
	 * @param win - Whether the team achieved a victory
	 */
	constructor(
		bans: Ban[],
		objectives: Objectives,
		teamId: number,
		win: boolean,
	) {
		this.bans = bans
		this.objectives = objectives
		this.teamId = teamId
		this.win = win
	}
}
