import { Repository, UpdateResult, } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductE } from 'src/entities/product.entity';
import { Product } from 'src/dto/product/product.dto';


@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductE)
    private readonly produtoRepository: Repository<ProductE>

  ) { }

  async listProducts(): Promise<ProductE[]> {
    

    return await this.produtoRepository.query(`select * from product_e`);
  }


  async createProduct(newProduct): Promise<ProductE>{

    let product = new Product(
    newProduct.store,
    newProduct.productName,
    Number(newProduct.price),
    newProduct.buyDate,
    Number(newProduct.unity),
    Boolean(newProduct.wasAcquired),
    Number(newProduct.list)
    );
 


    return await this.produtoRepository.save(product);
  }


  async updateProduct(idProduct: string,product:Product): Promise<UpdateResult> {
    
    return await this.produtoRepository.update(Number(idProduct),product)
    
  }

  async deleteProduct(idProduct: string): Promise<any> {
    const id = Number(idProduct)
    const deleteProduct = await this.produtoRepository.delete(id);
    console.log('Produto deletado')
    return deleteProduct
  }

}
