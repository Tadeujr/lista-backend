import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';


export class ProductDto {
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


  @IsNotEmpty({message:'Enter an integer value.'})
  unity: number;

  
  @IsBoolean()
  @IsNotEmpty()
  wasAcquired: boolean;
  
  @IsInt()
  list: string;
}
