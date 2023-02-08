import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { RegexHelper } from '../../util/regex';


export class AccountDto {
  @ApiProperty() //{example:"Tadeu da penha moraes junior"}
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uf: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  zipcode: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @Matches(RegexHelper.password, {
    message:
      'A senha deve conter letras maiúsculas minúsculas, números e caracteres especiais',
  })
  @IsNotEmpty()
  password: string;
}
