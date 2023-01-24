import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class ProductUpdate {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  store: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  buyDate: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  unity: number;

  @IsBoolean()
  @IsNotEmpty()
  wasAcquired: boolean;
}
