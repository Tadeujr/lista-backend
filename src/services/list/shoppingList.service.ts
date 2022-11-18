import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingListE } from '../../entities/shoppingList.entity';
import { List } from '../../models/list/list.model';

@Injectable()
export class ShoppingListService {

    constructor(
        @InjectRepository(ShoppingListE)
        private readonly listRepository: Repository<ShoppingListE>
    
      ) { }
    
      //So teste pois irei buscar por id do cliente as listas dele
      async allList(): Promise<ShoppingListE[]> {
        return await this.listRepository.find();
      }
    
    
      async createList(newList: List): Promise<ShoppingListE> {
        
        const list = new List(
            newList.total,
            newList.dateList.toString(),
            newList.user,
            
        );
        console.log(list)
        
        
          
        return await this.listRepository.save(list);
      }
    
    
    //   async updateProduct(idProducy: string,product:Product): Promise<UpdateResult> {
    
    //     const id = Number(idProducy)
        
    //     return await this.produtoRepository.update(id,product)
        
    //   }
    
    //   async deleteProduct(idProduct: string): Promise<any> {
    //     const id = Number(idProduct)
    //     const deleteProduct = await this.produtoRepository.delete(id);
    //     console.log('Produto deletado')
    //     return deleteProduct
    //   }
}
