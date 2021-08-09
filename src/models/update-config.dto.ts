import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateConfigDto } from './create-config.dto'

export class UpdateConfigDto extends PartialType(CreateConfigDto) {
	@ApiProperty({
		description:
			'Value used to authenticate the request; should match $env:SERVER_SECRET',
		name: 'secret',
		nullable: false,
		required: true,
		type: String,
	})
	secret: string

	@ApiProperty({
		description:
			'New value for the Riot API token; will override $env:RIOT_SECRET',
		name: 'token',
		nullable: false,
		required: true,
		type: String,
	})
	token: string

	/**
	 * @param secret - string
	 * @param token - string
	 */
	constructor(secret: string, token: string) {
		super()

		this.secret = secret
		this.token = token
	}
}
