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
        .then(mensagem => {
          res.status(HttpStatus.OK).json(mensagem);
        })
        .catch(() => {
          res
            .status(HttpStatus.FORBIDDEN)
            .json({ mensagem: "Produtos" });
        });
    }

    @Post()
    criarProduto(@Body() Product, @Res() res) {
      this.productService
        .criarProduto(Product)
        .then(mensagem => {
          res.status(HttpStatus.CREATED).json(mensagem);
        })
        .catch(() => {
          res.status(HttpStatus.FORBIDDEN)
            .json({ mensagem: HttpStatus.FORBIDDEN });
        });
    }

  @Put(":id")
  updateProduct(
    @Param('id') id:string ,
    @Body() product: Product,
    @Res() resposta
  ) {
    
    this.productService.updateProduct(id, product)
      .then(mensagem => {
        resposta.status(HttpStatus.OK).json(mensagem);
      })
      .catch(() => {
        resposta
          .status(HttpStatus.FORBIDDEN)
          .json({ mensagem: "Erro ao atualizar usuarios" });
      });
  }

  @Delete(':id')
  deleteProduct( @Param('id') id:string ,
  @Res() resposta){
    this.productService.deleteProduct(id)
      .then(mensagem => {
        resposta.status(HttpStatus.OK).json(mensagem);
      })
      .catch(() => {
        resposta
          .status(HttpStatus.FORBIDDEN)
          .json({ mensagem: "Erro ao atualizar usuarios" });
      });
  }
}
