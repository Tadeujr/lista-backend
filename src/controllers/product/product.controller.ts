import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Req, Res } from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product/product.model';


@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }


    @Get()
    listarProdutos(@Res() res) {
      this.productService
        .listarProdutos()
        .then(message => {
          res.status(HttpStatus.OK).json(message);
        })
        .catch(() => {
          res
            .status(HttpStatus.FORBIDDEN)
            .json({ message: "Produtos" });
        });
    }

    @Post()
    criarProduto(@Body() Product, @Res() res) {
      this.productService
        .criarProduto(Product)
        .then(message => {
          res.status(HttpStatus.CREATED).json(message);
        })
        .catch(() => {
          res.status(HttpStatus.FORBIDDEN)
            .json({ message: HttpStatus.FORBIDDEN });
        });
    }

  @Put(":id")
  updateProduct(
    @Param('id') id:string ,
    @Body() product: Product,
    @Res() res
  ) {
    
    this.productService.updateProduct(id, product)
      .then(message => {
        res.status(HttpStatus.OK).json(message);
      })
      .catch(() => {
        res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: "Erro ao atualizar usuarios" });
      });
  }

  @Delete(':id')
  deleteProduct( @Param('id') id:string ,
  @Res() res){
    this.productService.deleteProduct(id)
      .then(message => {
        res.status(HttpStatus.OK).json(message);
      })
      .catch(() => {
        res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: "Erro ao atualizar usuarios" });
      });
  }
}
