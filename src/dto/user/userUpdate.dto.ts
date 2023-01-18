import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { RegexHelper } from 'src/util/regex';



export class UserUpdateDto {
  @IsString()
  @Matches(RegexHelper.password, {
    message:
      'A senha deve conter letras maiúsculas minúsculas, números e caracteres especiais',
  })
  @IsNotEmpty()
  @IsEmail()
  password: string;

  

}
