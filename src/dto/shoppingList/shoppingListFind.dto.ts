import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ShoppingListfindDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dateList: string;

  @ApiProperty()
  @IsString()
  userId: string;
}
