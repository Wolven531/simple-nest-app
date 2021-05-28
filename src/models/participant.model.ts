import { ApiExtraModels, ApiProperty } from '@nestjs/swagger'
import { Stats } from './stats.model'
import { Timeline } from './timeline.model'

@ApiExtraModels(Stats, Timeline)
class Participant {
	/**
	 * @param participantId - Number of user the user in game (i.e. 1 - 10)
	 * @param teamId - Number representing the in game team for the user (e.g. 100, 200)
	 * @param championId - ID of the champion the user played in game
	 * @param spell1Id - ID of the first spell the user selected in loadout before game
	 * @param spell2Id - ID of the second spell the user selected in loadout before game
	 * @param stats - An object containing stats about the user's performance in game
	 * @param timeline - An object containing stats about the user's delta values throughout the game
	 */
	constructor(
		participantId: number,
		teamId: number,
		championId: number,
		spell1Id: number,
		spell2Id: number,
		stats: Stats,
		timeline: Timeline,
	) {
		this.participantId = participantId
		this.teamId = teamId
		this.championId = championId
		this.spell1Id = spell1Id
		this.spell2Id = spell2Id
		this.stats = stats
		this.timeline = timeline
	}

	@ApiProperty()
	participantId: number

	@ApiProperty()
	teamId: number

	@ApiProperty()
	championId: number

	@ApiProperty()
	spell1Id: number

	@ApiProperty()
	spell2Id: number

	@ApiProperty()
	stats: Stats

	@ApiProperty()
	timeline: Timeline
}

export { Participant }
