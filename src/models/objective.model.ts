import { ApiProperty } from '@nestjs/swagger'

export class Objective {
	@ApiProperty()
	first: boolean

	@ApiProperty()
	kills: number

	constructor(first: boolean, kills: number) {
		this.first = first
		this.kills = kills
	}
}
