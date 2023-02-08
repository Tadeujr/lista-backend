import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { shoppinglistController } from '../../controllers/list/shoppingList.controller';
import { ShoppingListE } from '../../entities/shoppingList.entity';
import { ShoppingListService } from '../../services/list/shoppingList.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingListE])],
  controllers: [shoppinglistController],
  providers: [ShoppingListService],
  exports: [ShoppingListService],
})
export class ShoppingListModule {}
