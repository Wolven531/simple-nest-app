import { ApiExtraModels, ApiProperty } from '@nestjs/swagger'
import { Objective } from './objective.model'

@ApiExtraModels(Objective)
export class Objectives {
	@ApiProperty({
		type: Objective,
	})
	baron: Objective

	@ApiProperty({
		type: Objective,
	})
	champion: Objective

	@ApiProperty({
		type: Objective,
	})
	dragon: Objective

	@ApiProperty({
		type: Objective,
	})
	inhibitor: Objective

	@ApiProperty({
		type: Objective,
	})
	riftHerald: Objective

	@ApiProperty({
		type: Objective,
	})
	tower: Objective

	constructor(
		baron: Objective,
		champion: Objective,
		dragon: Objective,
		inhibitor: Objective,
		riftHerald: Objective,
		tower: Objective,
	) {
		this.baron = baron
		this.champion = champion
		this.dragon = dragon
		this.inhibitor = inhibitor
		this.riftHerald = riftHerald
		this.tower = tower
	}
}
