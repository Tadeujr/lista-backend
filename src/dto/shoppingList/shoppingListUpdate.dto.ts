import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ShoppingListDto } from './shoppingList.dto';

export class ShoppingListUpdateDto extends ShoppingListDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
