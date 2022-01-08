import { HttpModule } from '@nestjs/axios'
import { Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MasteryService } from '../services/mastery.service'
import { UserService } from '../user/user.service'
import { SharedModule } from '../shared'

@Module({
	controllers: [],
	imports: [HttpModule, SharedModule],
	providers: [ConfigService, MasteryService, UserService, Logger],
})
export class CompositeModule {}
