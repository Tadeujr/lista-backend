import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingListDto } from 'src/dto/list/shoppingList.dto';
import { Repository, UpdateResult } from 'typeorm';
import { ShoppingListE } from '../../entities/shoppingList.entity';
import { ShoppingListUpdateDto } from '../../dto/list/shoppingListUpdate.dto';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectRepository(ShoppingListE)
    private readonly listRepository: Repository<ShoppingListE>,
  ) {}
  

  async allList(): Promise<ShoppingListE[]> {
        
    return await this.listRepository.query(`select * from "shoppingList"`);
  }
  //seach all list register from user
  async allListForUser(idUser:string): Promise<ShoppingListE[]> {
    return await this.listRepository.query(`select * from "shoppingList" where "userId" = '${idUser}'`)
  }

  //antes de criar a lista verificar se já existe a data criada e adicionar na lista existente 
  async createList(newList): Promise<ShoppingListE> {
    
    return await this.listRepository.save(newList);
  }



  async seacherList(list:any): Promise<ShoppingListE[]> {
    return await this.listRepository.query(`select * from "shoppingList" where "dateList" = '${list.dateList}' and "userId" = '${list.userId}'`)//and "userId" = '${list.idUser}'
    
  }

    async deleteList(id:string): Promise<any> {
      
      await this.listRepository.query(`delete from Product where "listId" ='${id}'`)
      return await this.listRepository.delete(id);
    }


    async updateList(id: string,list:ShoppingListUpdateDto):Promise<UpdateResult> {
      //const idI = Number(id);
      try {
        //find primary key list
        const listDb = await this.listRepository.query(`select * from public."shoppingList" where id = ${id};`)

        if(listDb.user = list.user){
          const listUp =   await this.listRepository.createQueryBuilder()
            .update(ShoppingListE)
            .set({ total: list.total, dateList: list.dateList })
            .where("id = :id", { id: id })
            .execute();
            
            return listUp;
        }
        
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
 
  }

