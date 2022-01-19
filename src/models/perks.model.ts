import { ApiExtraModels, ApiProperty } from '@nestjs/swagger'
import { PerkStats } from './perk-stats.model'
import { PerkStyle } from './perk-style.model'

@ApiExtraModels(PerkStats, PerkStyle)
export class Perks {
	@ApiProperty({
		type: PerkStats,
	})
	statPerks: PerkStats

	@ApiProperty({
		type: [PerkStyle],
	})
	styles: PerkStyle[]

	constructor(statPerks: PerkStats, styles: PerkStyle[]) {
		this.statPerks = statPerks
		this.styles = styles
	}
}
