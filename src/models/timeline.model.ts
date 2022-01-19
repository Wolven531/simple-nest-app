import { ApiProperty } from '@nestjs/swagger'

class Timeline {
	@ApiProperty()
	creepsPerMinDeltas: any

	@ApiProperty()
	csDiffPerMinDeltas: any

	@ApiProperty()
	damageTakenDiffPerMinDeltas: any

	@ApiProperty()
	damageTakenPerMinDeltas: any

	@ApiProperty()
	goldPerMinDeltas: any

	@ApiProperty()
	lane: string

	@ApiProperty()
	participantId: number

	@ApiProperty()
	role: string

	@ApiProperty()
	xpDiffPerMinDeltas: any

	@ApiProperty()
	xpPerMinDeltas: any

	/**
	 * @param participantId - In-match identifier of the player to which this timeline pertains
	 * @param creepsPerMinDeltas - ???
	 * @param xpPerMinDeltas - ???
	 * @param goldPerMinDeltas - ???
	 * @param csDiffPerMinDeltas - ???
	 * @param xpDiffPerMinDeltas - ???
	 * @param damageTakenPerMinDeltas - ???
	 * @param damageTakenDiffPerMinDeltas - ???
	 * @param role - Calculated role for the player in-match
	 * @param lane - Calculated lane for the player in-match
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
