import { Module } from '@nestjs/common';
import { ShoppingListE } from '../../entities/shoppingList.entity';
import { shoppinglistController } from '../../controllers/list/shoppingList.controller';
import { ShoppingListService } from '../../services/list/shoppingList.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([ShoppingListE])],
    controllers: [shoppinglistController],
    providers: [ShoppingListService],
    exports:[ShoppingListService]
  })
export class ShoppingListModule {}
