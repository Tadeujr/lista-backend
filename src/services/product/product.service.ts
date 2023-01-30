import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductE } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductUpdate } from '../../dto/product/productUpdate.dto';



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
    
    const prodctUp = await this.produtoRepository.merge(product, data);
    
    return await this.produtoRepository.save(prodctUp)
    
  }

  async deleteProduct(id): Promise<any> {
    
    const deleteProduct = await this.produtoRepository.delete(id);
    
    return deleteProduct
  }

}
