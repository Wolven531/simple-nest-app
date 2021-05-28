import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(
    'Loaded the following env vars',
    `PORT=${process.env.PORT}`,
    `RIOT_TOKEN=${process.env.RIOT_TOKEN}`,
  );

  const port = process.env.PORT || 8080;
  // const riotToken = process.env.RIOT_TOKEN || '';
  const app = await NestFactory.create(AppModule);

  await app.listen(port);
}
bootstrap();
