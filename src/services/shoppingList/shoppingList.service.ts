import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ShoppingListUpdateDto } from '../../dto/shoppingList/shoppingListUpdate.dto';
import { ShoppingListE } from '../../entities/shoppingList.entity';

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
    async allListForUser(idUser: string): Promise<ShoppingListE[]> {
        return await this.listRepository.query(
            `select * from "shoppingList" where "userId" = '${idUser}'`,
        );
    }

    //antes de criar a lista verificar se já existe a data criada e adicionar na lista existente
    async createList(newList): Promise<ShoppingListE> {
        return await this.listRepository.save(newList);
    }

    async seacherList(dateList: string, userId: string): Promise<ShoppingListE[]> {
        return await this.listRepository.query(
          `select * from "shoppingList" where "dateList" = $1 and "userId" = $2`,
          [dateList, userId],
        );
      }
//alterar para apagar a lista  e os produtos
      async deleteList(id: string): Promise<DeleteResult> {
        //delete from "shoppingList" where id =
        await this.listRepository.query(
            `delete from "product" where list = '${id}'`,
        );
        return await this.listRepository.delete(id);
    }

    async findList(id: number): Promise<ShoppingListE[]> {
        return await this.listRepository.query(
            `select * from "shoppingList" where id ='${id}'`,
        );
    }

    async updateList(
        id: string,
        list: ShoppingListUpdateDto,
    ): Promise<UpdateResult> {
        return await this.listRepository
            .createQueryBuilder()
            .update(ShoppingListE)
            .set({ dateList: list.dateList })
            .where('id = :id and userId = :user', { id: id, user: list.user })
            .execute();
    }

    async updateValorList(id: number, valor: number): Promise<UpdateResult> {
        return await this.listRepository
            .createQueryBuilder()
            .update(ShoppingListE)
            .set({ total: valor })
            .where('id = :id', { id: id })
            .execute();
    }
}
