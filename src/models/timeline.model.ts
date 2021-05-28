import { ApiProperty } from '@nestjs/swagger'

class Timeline {
	@ApiProperty()
	participantId: number

	@ApiProperty()
	creepsPerMinDeltas: any

	@ApiProperty()
	xpPerMinDeltas: any

	@ApiProperty()
	goldPerMinDeltas: any

	@ApiProperty()
	csDiffPerMinDeltas: any

	@ApiProperty()
	xpDiffPerMinDeltas: any

	@ApiProperty()
	damageTakenPerMinDeltas: any

	@ApiProperty()
	damageTakenDiffPerMinDeltas: any

	@ApiProperty()
	role: string

	@ApiProperty()
	lane: string

	/**
	 * @param participantId - In-game identifier of the player to which this timeline pertains
	 * @param creepsPerMinDeltas - ???
	 * @param xpPerMinDeltas - ???
	 * @param goldPerMinDeltas - ???
	 * @param csDiffPerMinDeltas - ???
	 * @param xpDiffPerMinDeltas - ???
	 * @param damageTakenPerMinDeltas - ???
	 * @param damageTakenDiffPerMinDeltas - ???
	 * @param role - Calculated role for the player in-game
	 * @param lane - Calculated lane for the player in-game
	 */
	constructor(
		participantId: number,
		creepsPerMinDeltas: any,
		xpPerMinDeltas: any,
		goldPerMinDeltas: any,
		csDiffPerMinDeltas: any,
		xpDiffPerMinDeltas: any,
		damageTakenPerMinDeltas: any,
		damageTakenDiffPerMinDeltas: any,
		role: string,
		lane: string,

	) {
		this.participantId = participantId
		this.creepsPerMinDeltas = creepsPerMinDeltas
		this.xpPerMinDeltas = xpPerMinDeltas
		this.goldPerMinDeltas = goldPerMinDeltas
		this.csDiffPerMinDeltas = csDiffPerMinDeltas
		this.xpDiffPerMinDeltas = xpDiffPerMinDeltas
		this.damageTakenPerMinDeltas = damageTakenPerMinDeltas
		this.damageTakenDiffPerMinDeltas = damageTakenDiffPerMinDeltas
		this.role = role
		this.lane = lane
	}
}

export { Timeline }
