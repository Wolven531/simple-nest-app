import { HttpModule, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ConfigController } from './config.controller'

@Module({
	controllers: [ConfigController],
	imports: [HttpModule],
	providers: [ConfigService, Logger],
})
export class ConfigurationModule {}
