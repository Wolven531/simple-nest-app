import { Logger, Module } from '@nestjs/common'
import { HealthController } from './health.controller'

@Module({
	controllers: [HealthController],
	providers: [Logger],
})
export class HealthModule {}
