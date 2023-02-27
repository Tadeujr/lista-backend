import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ShoppingListDto } from './shoppingList.dto';

export class ShoppingListUpdateDto extends OmitType(ShoppingListDto, [
    'total',
]) {
    @ApiProperty()
    @IsNumber()
    id: number;
}
