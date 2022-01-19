import { ApiProperty } from '@nestjs/swagger'

export class PerkStyleSelection {
	@ApiProperty()
	perk: number

	@ApiProperty()
	var1: number

	@ApiProperty()
	var2: number

	@ApiProperty()
	var3: number

	constructor(perk: number, var1: number, var2: number, var3: number) {
		this.perk = perk
		this.var1 = var1
		this.var2 = var2
		this.var3 = var3
	}
}
