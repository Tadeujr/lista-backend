import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ShoppingListDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    total: number;

    @ApiProperty()
    @IsString()
    dateList: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user: string;
}
