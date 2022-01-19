import { ApiProperty } from '@nestjs/swagger'

export class PerkStats {
	@ApiProperty()
	defense: number

	@ApiProperty()
	flex: number

	@ApiProperty()
	offense: number

	constructor(defense: number, flex: number, offense: number) {
		this.defense = defense
		this.flex = flex
		this.offense = offense
	}
}
