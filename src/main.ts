
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
    .addBearerAuth( { 
      // I was also testing it without prefix 'Bearer ' before the JWT
      description: `Inserir token gerado na rota de login, apoós se registrar`,
      name: 'Authorization',
      bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
      scheme: 'Bearer',
      type: 'http', // I`ve attempted type: 'apiKey' too
      in: 'Header'
    },
    'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!)
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
}

bootstrap();
