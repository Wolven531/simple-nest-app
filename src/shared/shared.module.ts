import { HttpModule, Logger, Module } from '@nestjs/common'
import { AppService } from '../services/app.service'

@Module({
	exports: [AppService, HttpModule, Logger],
	imports: [HttpModule],
	providers: [AppService, Logger],
})
export class SharedModule {}
