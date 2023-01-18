import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export default class PersonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  uf: string;

  @IsString()
  @IsNotEmpty()
  zipcode: string;

  @IsString()
  userFk?: string;

}
