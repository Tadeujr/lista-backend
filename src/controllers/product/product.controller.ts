import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductDto } from 'src/dto/product/product.dto';
import { ProductUpdate } from '../../dto/product/productUpdate.dto';
import { ProductService } from '../../services/product/product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token') //edit here
  @Get()
  @ApiOperation({summary:"listar todos os produtos de determinada lista"})
  listProducts(@Req() req, @Res() res) {
    this.productService
      .listProducts()
      .then((message) => {
        res.status(HttpStatus.OK).json(message);
      })
      .catch(() => {
        res.status(HttpStatus.FORBIDDEN).json({ message: 'Produtos' });
      });
  }

  
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createProduct(@Body() product: ProductDto, @Req() req, @Res() res) {
    this.productService
      .createProduct(product)
      .then((message) => {
        res.status(HttpStatus.CREATED).json(message);
      })
      .catch(() => {
        res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: HttpStatus.FORBIDDEN });
      });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() body: ProductUpdate,
    @Req() req,
    @Res() res,
  ) {
    this.productService
      .updateProduct(id, body)
      .then((message) => {
        res.status(HttpStatus.OK).json(message);
      })
      .catch(() => {
        res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: 'Erro ao atualizar usuarios' });
      });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteProduct(@Param('id') id: string, @Req() req, @Res() res) {
    this.productService
      .deleteProduct(id)
      .then((message) => {
        res.status(HttpStatus.OK).json(message);
      })
      .catch(() => {
        res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: 'Erro ao atualizar usuarios' });
      });
  }
}
