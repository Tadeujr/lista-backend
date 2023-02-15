import { OmitType } from '@nestjs/swagger';
import { ProductDto } from 'src/dto/product/product.dto';

export class ProductUpdate extends OmitType(ProductDto, ['list']) {}
