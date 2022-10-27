import { Module } from '@nestjs/common';
import { ProductController } from '../../controllers/product/product.controller';
import { ProductService } from '../../services/product/product.service';

const modelService = [ProductService];
const modelController = [ProductController]

@Module({
    imports:[],
    controllers: [...modelController],
    providers: [...modelService]
  })
export class ProductModule {}







  

  export class ProdutcModule { }