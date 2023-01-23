import { IsString, IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { RegexHelper } from 'src/util/regex';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({})
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({})
    @IsString()
    @Matches(RegexHelper.password, {
      message:
        'A senha deve conter letras maiúsculas minúsculas, números e caracteres especiais',
    })
    @IsNotEmpty()
    password: string;
}
