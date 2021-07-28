import { HttpModule } from '@nestjs/axios'
import { Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SharedModule } from '../shared'
import { ConfigController } from './config.controller'

@Module({
	controllers: [ConfigController],
	imports: [HttpModule, SharedModule],
	providers: [ConfigService, Logger],
})
export class ConfigurationModule {}
