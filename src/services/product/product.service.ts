import { Repository, UpdateResult, } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductE } from 'src/entities/product.entity';
import { Product } from 'src/models/product/product.model';


@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductE)
    private readonly produtoRepository: Repository<ProductE>

  ) { }

  async listarProdutos(): Promise<ProductE[]> {
    return await this.produtoRepository.find();
  }


  async createProduct(newProduct: Product): Promise<ProductE> {
    const product = new Product(
    newProduct.store,
    newProduct.productName,
    Number(newProduct.price),
    newProduct.buyDate,
    Number(newProduct.unity),
    );
      
    return await this.produtoRepository.save(product);
  }


  async updateProduct(idProducy: string,product:Product): Promise<UpdateResult> {

    const id = Number(idProducy)
    
    return await this.produtoRepository.update(id,product)
    
  }

  async deleteProduct(idProduct: string): Promise<any> {
    const id = Number(idProduct)
    const deleteProduct = await this.produtoRepository.delete(id);
    console.log('Produto deletado')
    return deleteProduct
  }

}
