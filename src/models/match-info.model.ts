import { ApiExtraModels, ApiProperty } from '@nestjs/swagger'
import { Participant } from './participant.model'

@ApiExtraModels(Participant)
export class MatchInfo {
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
		type: [Participant],
	})
	participants: Participant[]

	@ApiProperty()
	platformId: string

	@ApiProperty()
	queueId: number

	@ApiProperty()
	teams: any[]

	@ApiProperty()
	tournamentCode: string

	/**
	 * For more specific information on constants and values, please
	 * visit https://developer.riotgames.com/docs/lol#general_game-constants
	 *
	 * @param info - match info
	 * @param metadata - match metadata
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
		participants: Participant[],
		platformId: string,
		queueId: number,
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
