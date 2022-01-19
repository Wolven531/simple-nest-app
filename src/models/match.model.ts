import { ApiExtraModels, ApiProperty } from '@nestjs/swagger'
import { MatchInfo } from './match-info.model'
import { MatchMetadata } from './match-metadata.model'

@ApiExtraModels(MatchMetadata, MatchInfo)
export class Match {
	@ApiProperty()
	info: MatchInfo

	@ApiProperty()
	metadata: MatchMetadata

	/**
	 * For more specific information on constants and values, please
	 * visit https://developer.riotgames.com/docs/lol#general_game-constants
	 *
	 * @param info - match info
	 * @param metadata - match metadata
	 */
	constructor(info: MatchInfo, metadata: MatchMetadata) {
		this.info = info
		this.metadata = metadata
	}
}
