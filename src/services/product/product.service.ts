import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/dto/product/product.dto';
import { ProductUpdate } from 'src/dto/product/productUpdate.dto';
import { ProductE } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductE)
    private readonly produtoRepository: Repository<ProductE>,
  ) {}

  async listProducts(): Promise<ProductE[]> {
    return await this.produtoRepository.query(`select * from Product`);
  }

  async createProduct(newProducts: ProductDto[]): Promise<ProductE[]> {
    // newProducts.forEach(async (x) => {
    //   await this.produtoRepository.save(x);
    // });
    return await this.produtoRepository.save(newProducts);

    // //return a new list created in database
    // return await this.produtoRepository.query(
    //   `select * from product where "listId" = ${newProducts[0].listId}`,
    // );
  }

  async updateProduct(id, data: ProductUpdate): Promise<ProductE> {
    const product = await this.produtoRepository.findOneOrFail({
      where: { id },
    });

    const prodctUp = await this.produtoRepository.merge(product, data);

    return await this.produtoRepository.save(prodctUp);
  }

  async deleteProduct(id): Promise<any> {
    const deleteProduct = await this.produtoRepository.delete(id);

    return deleteProduct;
  }
}
