import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ShoppingListE } from './entities/shoppingList.entity';
import PersonE from './entities/person.entity';
import { shoppinglistController } from './controllers/list/shoppingList.controller';
import { ShoppingListService } from './services/list/shoppingList.service';
import { UsersModule } from './module/users/users.module';
import { ProductModule } from './module/product/product.module';

const apiControlers = [shoppinglistController];
const apiServices = [ShoppingListService];
const modelEntity = [ShoppingListE,PersonE];
const modules = [ProductModule,UsersModule,]


@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE,
      host: process.env.LOCALHOST_DATABASE,
      port: Number(process.env.PORT_DATABASE),
      username: process.env.USERNAME_DATABASE,
      password:process.env.PASSWORD_DATABASE,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize:Boolean(process.env.SYNCHRONIZE_DATABASE)
    } as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([...modelEntity]),
    ...modules
  ],
  controllers: [...apiControlers],
  providers: [...apiServices],
})
export class AppModule {}
