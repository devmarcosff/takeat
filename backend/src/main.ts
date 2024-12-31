import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, '*'],
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  try {
    await app.listen(process.env.PORT || 8000);
    console.log('Aplicação conectada com sucesso ao banco de dados.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}
bootstrap();
