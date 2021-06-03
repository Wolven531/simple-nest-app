import { Module } from '@nestjs/common'
import { ConfigurationModule } from '../config'
import { SharedModule } from '../shared/shared.module'
import { UserModule } from '../user/user.module'
// local
import { AppController } from './app.controller'

@Module({
	controllers: [AppController],
	imports: [
		SharedModule, // contains 'boilerplate' stuff (e.g. Http, Logger, etc.)
		ConfigurationModule, // contains config endpoints
		UserModule, // contains user endpoints
	],
	providers: [],
})
export class AppModule {}
