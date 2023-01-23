import { IsInt, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ShoppingListDto {
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsString()
  @IsNotEmpty()
  dateList: string;

  @IsString()
  user: string;

  @IsString()
  products: string;
}
