import { NestFactory } from '@nestjs/core'; import { AppModule } from './app.module'; import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.enableCors({
   origin: ['https://ferydani.com', 'https://www.ferydani.com', 'http://localhost:4200'], // Dominios permitidos
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000).then(() => {
    console.log(`🚀 Server is running on port ${process.env.PORT ?? 3000}`)
    });
  
}
  
bootstrap();

