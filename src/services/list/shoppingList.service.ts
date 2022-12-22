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

  //seach all list register from user
  async allList(idUser): Promise<ShoppingListE[]> {
    return await this.listRepository.query(`select * from "shoppingList" where "userId" = '${idUser}'`)
  }

  //antes de criar a lista verificar se já existe a data criada e adicionar na lista existente 
  async createList(newList): Promise<ShoppingListE> {
    
    return await this.listRepository.save(newList);
  }

  async seacherList(list:any): Promise<ShoppingListE[]> {
    return await this.listRepository.query(`select * from "shoppingList" where "dateList" = '${list.dateList}' and "userId" = '${list.userId}'`)//and "userId" = '${list.idUser}'
    
  }

    async deleteList(id): Promise<any> {
      
      await this.listRepository.query(`delete from Product where "listId" ='${id}'`)
      return await this.listRepository.delete(id);
    }


    async updateProduct(idList: number,list:ShoppingListE): Promise<UpdateResult> {
    
      return await this.listRepository.update(Number(idList),list)
      
    }

  }
