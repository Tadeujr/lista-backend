import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsNumber } from 'class-validator';


export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  store: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  brand: string;


  @IsNumber()
  @ApiProperty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  buyDate: string;


  @IsNotEmpty({message:'Enter an integer value.'})
  @ApiProperty()
  unity: number;

  
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  wasAcquired: boolean;
  
  @IsString()
  @ApiProperty()
  list: string;
}
