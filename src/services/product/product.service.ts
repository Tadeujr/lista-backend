import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductUpdate } from 'src/dto/product/productUpdate.dto';
import { ProductE } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { ShoppingListService } from '../list/shoppingList.service';
import { ProductDto } from '../../dto/product/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductE)
    private readonly produtoRepository: Repository<ProductE>,
    @Inject(forwardRef(() => ShoppingListService))
    private readonly shoppingListService: ShoppingListService,
  ) {}

  async listProducts(): Promise<ProductE[]> {
    return await this.produtoRepository.query(`select * from Product`);
  }

  async createProduct(newProducts: ProductE[]): Promise<ProductE[]> {
    const products =  await this.produtoRepository.save(newProducts);

    //updating ShoppingList (SUM)
    this.updateList(true,products)
    
    return products;
  }

  //melhorar
  async updateProduct(id, data: ProductUpdate): Promise<ProductE> {
    const product = await this.produtoRepository.findOneOrFail({
      where: { id },
    });

    const prodctUp = await this.produtoRepository.merge(product, data);

    return await this.produtoRepository.save(prodctUp);
  }

  async deleteProduct(id:number): Promise<any> {
    // this.updateList(true,products),idList:number
    const deleteProduct = await this.produtoRepository.delete(id);

    return deleteProduct;
  }

  //true for sum or false for decrease 
  private async updateList(operation:boolean,products:ProductE[]){
   
    let valorList = 0.0;
    //search in database for update valor total
    const list = await this.shoppingListService.findList(Number(products[0].list));
    valorList = Number(list[0].total);

    //sum valor products
    const totalProduct = Number(products.reduce( (acum:number,item:ProductE) => {
      return acum += item.price
    },0.0).toFixed(2))


    //updating the total  in "ShoppingList"
    if(operation){
      await this.shoppingListService.updateValorList(Number(products[0].list), (valorList + totalProduct))
      
    }else{
      await this.shoppingListService.updateValorList(Number(products[0].list), (valorList - totalProduct))
    }



    

    
  }

  private operatorList(){

  }
}
