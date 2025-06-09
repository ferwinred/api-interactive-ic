import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
  origin: ['https://tusitio.com', 'http://localhost:4200'], // Dominios permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Si necesitas enviar cookies o headers con auth
});

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 🔁 esto permite aplicar @Transform()
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
