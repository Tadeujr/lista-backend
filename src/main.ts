import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  //version Api
  await app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  //config Swagger
  const config = new DocumentBuilder()
    .setTitle('List example')
    .setDescription('Api de consulta da aplicação web de lista de supermecado')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Inserir token gerado na rota de login, apoós se registrar`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3001);
}

bootstrap();
