import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Req, Res } from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../dto/product/product.dto';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ProductE } from 'src/entities/product.entity';


@Controller('api/v1/product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }


    @Get()
    // @ApiParam({
    //   name: 'any',
    //   required: false,
    //   description: 'Should be an id of a post that exists in the database',
      
    // })
    listProducts(@Req() req,@Res() res) {
      //console.log(req)
      this.productService
        .listProducts()
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
    createProduct(@Body() product:Product, @Req() req, @Res() res) {
      this.productService
        .createProduct(product)
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
    @Body() product: ProductE,
    @Req() req,
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
  deleteProduct( @Param('id') id:string ,@Req() req,
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
