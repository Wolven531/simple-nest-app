import { HttpModule, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppService } from '../services/app.service'
import { ConfigController } from './config.controller'

@Module({
	controllers: [ConfigController],
	imports: [HttpModule],
	providers: [AppService, ConfigService, Logger],
})
export class ConfigurationModule {}
