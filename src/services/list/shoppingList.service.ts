import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ShoppingListE } from '../../entities/shoppingList.entity';
import {ShoppingList } from '../../dto/list/list.dto';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectRepository(ShoppingListE)
    private readonly listRepository: Repository<ShoppingListE>,
  ) {}

  //So teste pois irei buscar por id do cliente as listas dele
  async allList(idUser): Promise<ShoppingListE[]> {
    return await this.listRepository.query(`select * from shopping_list_e where "userId" = '${idUser}'`)
  }

  //antes de criar a lista verificar se já existe a data criada e adicionar na lista existente 
  async createList(newList: ShoppingListE): Promise<ShoppingListE> {
    return await this.listRepository.save(newList);
  }

  async seacherList(list:any): Promise<ShoppingListE[]> {
    console.log(list)
    return await this.listRepository.query(`select * from shopping_list_e where "dateList" = '${list.dateList}' and "userId" = '${list.userId}'`)//and "userId" = '${list.idUser}'
    
  }

    async deleteList(id): Promise<any> {
      
      await this.listRepository.query(`delete from product_e where "listId" ='${id}'`)
      return await this.listRepository.delete(id);
    }
}
