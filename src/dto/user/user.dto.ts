import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { RegexHelper } from '../../util/regex';


export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  @Matches(RegexHelper.email, {
    message: 'Insira um email válido.',
  })
  @ApiProperty()
  email: string;

  @IsString()
  @Matches(RegexHelper.password, {
    message:
      'A senha deve conter letras maiúsculas minúsculas, números e caracteres especiais',
  })
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  person: any;
}
