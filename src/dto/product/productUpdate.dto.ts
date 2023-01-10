import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';


export class ProductUpdate {
  @IsString()
  @IsNotEmpty()
  store: string;

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  buyDate: string;

  @IsInt()
  @IsNotEmpty()
  unity: number;

  @IsBoolean()
  @IsNotEmpty()
  wasAcquired: boolean;
}
