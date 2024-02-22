import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configServie = app.get(ConfigService);
  const port = configServie.get('APP_PORT');

  await app.listen(port).then(() => {
    console.log(`Server is running on port ${port}`);
  });
}
bootstrap();
