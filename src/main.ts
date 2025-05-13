import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: true,
      colors: true,
      logLevels: ['error', 'warn', 'log'],
    }),
  });
  await app.listen(process.env.PORT ?? '3000');
}
bootstrap().catch((err) => {
  console.error('Error starting application', err);
});
