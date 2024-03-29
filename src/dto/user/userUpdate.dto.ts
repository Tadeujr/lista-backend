import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { RegexHelper } from '../../util/regex';

export class UserUpdateDto {
    @ApiProperty()
    @IsString()
    @Matches(RegexHelper.password, {
        message:
            'A senha deve conter letras maiúsculas minúsculas, números e caracteres especiais',
    })
    @IsNotEmpty()
    password: string;
}
