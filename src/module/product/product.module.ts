import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingListModule } from '../shopping-list/shopping-list.module';
import { ProductController } from '../../controllers/product/product.controller';
import { ProductService } from '../../services/product/product.service';
import { ProductE } from '../../entities/product.entity';

@Module({
    imports: [ShoppingListModule, TypeOrmModule.forFeature([ProductE])],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductModule {}
