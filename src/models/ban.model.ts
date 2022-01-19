import { ApiProperty } from '@nestjs/swagger'

export class Ban {
	@ApiProperty()
	championId: number

	@ApiProperty()
	pickTurn: number

	constructor(championId: number, pickTurn: number) {
		this.championId = championId
		this.pickTurn = pickTurn
	}
}
