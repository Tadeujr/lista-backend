import { IsEmail, IsNotEmpty, IsString, Matches, IsNumber } from 'class-validator';
import { RegexHelper } from 'src/util/regex';

export class UserDto {
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

  @IsNotEmpty()
  person: any;
}
