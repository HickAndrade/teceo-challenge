import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: process.env.FRONTEND_URL?.split(',') ?? '*',
    credentials: true
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  
  const port = parseInt(process.env.PORT ?? '3000', 10);
  await app.listen(port);
  
  console.log(`running on http://localhost:${port}`)
}
bootstrap();
