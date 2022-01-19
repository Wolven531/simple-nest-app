import { ApiExtraModels, ApiProperty } from '@nestjs/swagger'
import { PerkStyleSelection } from './perk-style-selection.model'

@ApiExtraModels(PerkStyleSelection)
export class PerkStyle {
	@ApiProperty()
	description: string

	@ApiProperty({
		type: [PerkStyleSelection],
	})
	selections: PerkStyleSelection[]

	@ApiProperty()
	style: number

	constructor(
		description: string,
		selections: PerkStyleSelection[],
		style: number,
	) {
		this.description = description
		this.selections = selections
		this.style = style
	}
}
