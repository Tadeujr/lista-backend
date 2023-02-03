import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from 'src/controllers/product/product.controller';
import { ProductE } from 'src/entities/product.entity';

import { ProductService } from 'src/services/product/product.service';
import { ShoppingListModule } from '../shopping-list/shopping-list.module';

@Module({
  imports: [ShoppingListModule, TypeOrmModule.forFeature([ProductE])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
