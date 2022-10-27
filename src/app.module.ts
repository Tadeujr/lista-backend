import { Module } from '@nestjs/common';
import { AppService } from './services/app/app.service';
import { AppController } from './controllers/app/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductE } from './entites/product.entity';
import { ProductController } from './controllers/product/product.controller';
import { ProductService } from './services/product/product.service';
import { ConfigModule } from '@nestjs/config';

const apiControlers = [ProductController,AppController];
const apiServices = [ProductService,AppService];
const modelEntity = [ProductE];


@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.LOCALHOST_DATABASE,
      port: Number(process.env.PORT_DATABASE),
      username: process.env.USERNAME_DATABASE,
      password:process.env.PASSWORD_DATABASE,
      database: process.env.DATABASE,
      entities: [
          ...modelEntity
      ],
      synchronize:Boolean(process.env.SYNCHRONIZE_DATABASE)
    }),
    TypeOrmModule.forFeature([...modelEntity]),
   
  ],
  controllers: [...apiControlers],
  providers: [...apiServices],
})
export class AppModule {}
