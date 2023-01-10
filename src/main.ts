
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('List example')
    .setDescription('Api de consulta da aplicação web de lista de supermecado')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentationApi', app, document);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
}

bootstrap();
