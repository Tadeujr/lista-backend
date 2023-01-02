import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductE } from './entities/product.entity';
import { ProductController } from './controllers/product/product.controller';
import { ProductService } from './services/product/product.service';
import { ConfigModule } from '@nestjs/config';
import { ShoppingListE } from './entities/shoppingList.entity';
import { UserE } from './entities/user.entity';
import PersonE from './entities/person.entity';
import { shoppinglistController } from './controllers/list/shoppingList.controller';
import { ShoppingListService } from './services/list/shoppingList.service';

const apiControlers = [ProductController,shoppinglistController];
const apiServices = [ProductService,ShoppingListService];
const modelEntity = [ProductE,ShoppingListE,PersonE,UserE];


@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.LOCALHOST_DATABASE,
      port: Number(process.env.PORT_DATABASE),
      username: process.env.USERNAME_DATABASE,
      password:process.env.PASSWORD_DATABASE,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize:Boolean(process.env.SYNCHRONIZE_DATABASE)
    }),
    TypeOrmModule.forFeature([...modelEntity]),
   
  ],
  controllers: [...apiControlers],
  providers: [...apiServices],
})
export class AppModule {}
