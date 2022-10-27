import { Repository, UpdateResult, } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductE } from 'src/entites/product.entity';
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


  async criarProduto(newProduct: Product): Promise<ProductE> {
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

 
  async updateProductw(id:any,updateProduct:Product):Promise<ProductE> {
    
    const seachProduct = await this.produtoRepository.findOne(id)
    console.log(seachProduct)
    seachProduct.store = updateProduct.store;
    seachProduct.productName = updateProduct.productName;
    seachProduct.price = updateProduct.price;
    seachProduct.unity = updateProduct.unity;
    
    return await this.produtoRepository.save(seachProduct);
  }

  async deleteProduct(idProduct: string): Promise<any> {
    const id = Number(idProduct)
    const deleteProduct = await this.produtoRepository.delete(id);
    console.log('Produto deletado')
    return deleteProduct
  }

}
