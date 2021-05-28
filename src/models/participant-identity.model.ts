import { ApiExtraModels, ApiProperty } from '@nestjs/swagger'
import { Player } from './player.model'

@ApiExtraModels(Player)
class ParticipantIdentity {
	@ApiProperty()
	participantId: number

	@ApiProperty()
	player: Player

	/**
	 * @param participantId - Number of the participant in game (e.g. 1-10 on SR, 1-9 on TFT)
	 * @param player - Object containing player information for this participant
	 */
	constructor(
		participantId: number,
		player: Player,
	) {
		this.participantId = participantId
		this.player = player
	}
}

export { ParticipantIdentity }
