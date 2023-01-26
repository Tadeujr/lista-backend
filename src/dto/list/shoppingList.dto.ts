import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ShoppingListDto {


  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dateList: string;

  @ApiProperty()
  @IsString()
  user: string;


}
