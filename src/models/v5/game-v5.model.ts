import { ApiExtraModels, ApiProperty } from '@nestjs/swagger'
import { ParticipantV5 } from './participant-v5.model'

@ApiExtraModels(ParticipantV5)
export class GameV5 {
	@ApiProperty()
	gameCreation: number

	@ApiProperty()
	gameDuration: number

	@ApiProperty()
	gameEndTimestamp: number

	@ApiProperty()
	gameId: number

	@ApiProperty()
	gameMode: string

	@ApiProperty()
	gameName: string

	@ApiProperty()
	gameStartTimestamp: number

	@ApiProperty()
	gameType: string

	@ApiProperty()
	gameVersion: string

	@ApiProperty()
	mapId: number

	@ApiProperty({
		type: [ParticipantV5],
	})
	participants: ParticipantV5[]

	@ApiProperty()
	platformId: string

	@ApiProperty()
	queueId: number

	@ApiProperty()
	teams: any[]

	@ApiProperty()
	tournamentCode: string

	/**
	 * @param gameCreation number
	 * @param gameDuration number
	 * @param gameEndTimestamp number
	 * @param gameId number
	 * @param gameMode string
	 * @param gameName string
	 * @param gameStartTimestamp number
	 * @param gameType string
	 * @param gameVersion string
	 * @param mapId number
	 * @param participants ParticipantV5[]
	 * @param platformId string
	 * @param queueId number
	 * @param teams any[]
	 * @param tournamentCode string
	 */
	constructor(
		gameCreation: number,
		gameDuration: number,
		gameEndTimestamp: number,
		gameId: number,
		gameMode: string,
		gameName: string,
		gameStartTimestamp: number,
		gameType: string,
		gameVersion: string,
		mapId: number,
		// participants:	List[ParticipantDto]
		participants: ParticipantV5[],
		platformId: string,
		queueId: number,
		// teams:	List[TeamDto]
		teams: any[],
		tournamentCode: string,
	) {
		this.gameCreation = gameCreation
		this.gameDuration = gameDuration
		this.gameEndTimestamp = gameEndTimestamp
		this.gameId = gameId
		this.gameMode = gameMode
		this.gameName = gameName
		this.gameStartTimestamp = gameStartTimestamp
		this.gameType = gameType
		this.gameVersion = gameVersion
		this.mapId = mapId
		this.participants = participants
		this.platformId = platformId
		this.queueId = queueId
		this.teams = teams
		this.tournamentCode = tournamentCode
	}
}
