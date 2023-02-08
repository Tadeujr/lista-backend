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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ProductDto } from 'src/dto/product/product.dto';
import { ProductE } from 'src/entities/product.entity';
import { ProductService } from '../../services/product/product.service';

@ApiTags('Product')
@Controller('product')
@ApiBearerAuth('access-token') //edit here
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'listar todos os produtos de determinada lista' })
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

  @ApiOkResponse()
  @ApiBody({
    isArray: true,
    type: ProductDto,
  })
  @Post()
  createProduct(@Body() body: ProductE[], @Req() req, @Res() res) {
    this.productService
      .createProduct(body)
      .then((message) => {
        res.status(HttpStatus.CREATED).json(message);
      })
      .catch(() => {
        res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: HttpStatus.FORBIDDEN });
      });
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() body: ProductDto,
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
          .json({ message: 'Erro ao atualizar o(s) produtro(s)' });
      });
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number, @Req() req, @Res() res) {
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
