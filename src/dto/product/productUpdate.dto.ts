import { OmitType } from '@nestjs/swagger';
import { ProductDto } from './product.dto';


export class ProductUpdate extends OmitType(ProductDto,['list']){}
