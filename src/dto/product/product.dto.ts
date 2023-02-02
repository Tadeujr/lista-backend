import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductE } from 'src/entities/product.entity';

export class ProductDto {
  id?:number;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  store: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  productName: string;

  @IsString()
  @ApiProperty()
  brand: string;

  @ApiProperty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  buyDate: string;

  @IsNotEmpty({ message: 'Enter an integer value.' })
  @ApiProperty()
  unity: number;

  @ApiProperty()
  commercialUnit?: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  wasAcquired: boolean;

  @IsNumber()
  @ApiProperty({type:Number})
  list: ProductE;
}
