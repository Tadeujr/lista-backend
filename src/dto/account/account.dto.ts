import { IsString, IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { RegexHelper } from 'src/util/regex';

export class AccountDto{
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
    userFk: any;

    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @Matches(RegexHelper.password, {
      message:
        'A senha deve conter letras maiúsculas minúsculas, números e caracteres especiais',
    })
    @IsNotEmpty()
    password: string;
  
 
    @IsString()
    person?: string;
}