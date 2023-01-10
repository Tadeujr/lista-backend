import { Repository, UpdateResult, } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ProductE } from 'src/entities/product.entity';
import { ProductUpdate } from '../../dto/product/productUpdate.dto';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductE)
    private readonly produtoRepository: Repository<ProductE>

  ) { }

  async listProducts(): Promise<ProductE[]> {
    

    return await this.produtoRepository.query(`select * from Product`);
  }


  async createProduct(newProduct): Promise<ProductE>{
    return await this.produtoRepository.save(newProduct);
  }


  async updateProduct(id,data:ProductUpdate): Promise<ProductE> {

    const product = await this.produtoRepository.findOneOrFail({where: {id}})
    this.produtoRepository.merge(product, data);
    
    return await this.produtoRepository.save(product)
    
  }

  async deleteProduct(id): Promise<any> {
    
    const deleteProduct = await this.produtoRepository.delete(id);
    
    return deleteProduct
  }

}
