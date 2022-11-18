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

  async listProducts(): Promise<ProductE[]> {
    const saida = await this.produtoRepository.find()
    //console.log(saida[1]);
    //listFK: ShoppingListE {
    

    return await this.produtoRepository.find();
  }


  async createProduct(newProduct: Product): Promise<ProductE> {
    
    const product = new Product(
    newProduct.store,
    newProduct.productName,
    Number(newProduct.price),
    newProduct.buyDate,
    Number(newProduct.unity),
    Boolean(newProduct.wasAcquired),
    Number(newProduct.list)
    );
 
    // console.log(product) 
    
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
