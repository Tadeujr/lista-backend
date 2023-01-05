import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ShoppingListDto {
  @IsInt()
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
