import { Participant } from './participant.model'
import { ParticipantIdentity } from './participant-identity.model'
import { Team } from './team.model'
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger'

@ApiExtraModels(Participant, ParticipantIdentity, Team)
class Game {
	/**
	 * @param gameCreation - Timestamp of when game was created
	 * @param gameDuration - Length of game in seconds
	 * @param gameId - Unique identifier for game
	 * @param gameMode - Mode of game (e.g. 'CLASSIC')
	 * @param gameType - Type of game (e.g. 'MATCHED_GAME')
	 * @param gameVersion - Patch version used for game
	 * @param mapId - Refers to which map game was played on
	 * @param participantIdentities - Array of info related to League about participants
	 * @param participants - Array of info related to specific game about participants
	 * @param platformId - Which platform game was played on (e.g. 'NA1')
	 * @param queueId - Which queue generated game
	 * @param seasonId - Which season game was played in
	 * @param teams - Array describing the factions in game
	 */
	constructor(
		gameCreation: number,
		gameDuration: number,
		gameId: number,
		gameMode: string,
		gameType: string,
		gameVersion: string,
		mapId: number,
		participantIdentities: ParticipantIdentity[],
		participants: Participant[],
		platformId: string,
		queueId: number,
		seasonId: number,
		teams: Team[],
	) {
		this.gameCreation = gameCreation
		this.gameDuration = gameDuration
		this.gameId = gameId
		this.gameMode = gameMode
		this.gameType = gameType
		this.gameVersion = gameVersion
		this.mapId = mapId
		this.participantIdentities = participantIdentities
		this.participants = participants
		this.platformId = platformId
		this.queueId = queueId
		this.seasonId = seasonId
		this.teams = teams
	}

	@ApiProperty()
	gameCreation: number

	@ApiProperty()
	gameDuration: number

	@ApiProperty()
	gameId: number

	@ApiProperty()
	gameMode: string

	@ApiProperty()
	gameType: string

	@ApiProperty()
	gameVersion: string

	@ApiProperty()
	mapId: number

	@ApiProperty({
		type: [ParticipantIdentity]
	})
	participantIdentities: ParticipantIdentity[]

	@ApiProperty({
		type: [Participant]
	})
	participants: Participant[]

	@ApiProperty()
	platformId: string

	@ApiProperty()
	queueId: number

	@ApiProperty()
	seasonId: number

	@ApiProperty()
	teams: Team[]
}

export { Game }
