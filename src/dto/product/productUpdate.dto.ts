import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductDto } from './product.dto';


export class ProductUpdate extends OmitType(ProductDto,['list']){}
