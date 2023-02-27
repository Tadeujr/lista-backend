import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ShoppingListfindDto {
    @ApiProperty()
    @IsString()
    dateList: string;

    @ApiProperty()
    @IsString()
    userId: string;
}
