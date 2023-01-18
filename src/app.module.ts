import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import PersonE from './entities/person.entity';
import { UsersModule } from './module/users/users.module';
import { ProductModule } from './module/product/product.module';
import { ShoppingListModule } from './module/shopping-list/shopping-list.module';
import { AuthModule } from './module/auth/auth.module';
import { PersonModule } from './module/person/person.module';


const modules = [PersonModule, UsersModule,ProductModule, ShoppingListModule,AuthModule];

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE,
      host: process.env.LOCALHOST_DATABASE,
      port: process.env.PORT_DATABASE,
      username: process.env.USERNAME_DATABASE,
      password: process.env.PASSWORD_DATABASE,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: Boolean(process.env.SYNCHRONIZE_DATABASE),
    } as TypeOrmModuleOptions),
    ...modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
