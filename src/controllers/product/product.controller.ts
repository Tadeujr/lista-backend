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
import { ProductService } from '../../services/product/product.service';
import { ProductDto } from '../../dto/product/product.dto';
import { ProductE } from '../../entities/product.entity';

@ApiTags('Product')
@Controller('product')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get(':listId')
    @ApiOperation({
        summary:
            'Lista todos os produtos de uma determinada lista a partir do ID.',
    })
    listProducts(@Param('listId') id: string, @Req() req, @Res() res) {
        this.productService
            .listProducts(id)
            .then(message => {
                res.status(HttpStatus.OK).json(message);
            })
            .catch(() => {
                res.status(HttpStatus.FORBIDDEN).json({
                    message: 'Produtos não encontrados',
                });
            });
    }

    @ApiOkResponse()
    @ApiBody({
        isArray: true,
        type: ProductDto,
    })
    @Post()
    @ApiOperation({ summary: 'Criar um novo produto.' })
    createProduct(@Body() body: ProductE[], @Req() req, @Res() res) {
        this.productService
            .createProduct(body)
            .then(message => {
                res.status(HttpStatus.CREATED).json(message);
            })
            .catch(() => {
                res.status(HttpStatus.FORBIDDEN).json({
                    message: HttpStatus.FORBIDDEN,
                });
            });
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualiza dados do produto.' })
    updateProduct(
        @Param('id') id: number,
        @Body() body: ProductDto,
        @Req() req,
        @Res() res,
    ) {
        this.productService
            .updateProduct(id, body)
            .then(message => {
                res.status(HttpStatus.OK).json(message);
            })
            .catch(() => {
                res.status(HttpStatus.FORBIDDEN).json({
                    message: 'Erro ao atualizar o(s) produto(s).',
                });
            });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deleta dados do produto.' })
    deleteProduct(@Param('id') id: number, @Req() req, @Res() res) {
        this.productService
            .deleteProduct(id)
            .then(message => {
                res.status(HttpStatus.OK).json(message);
            })
            .catch(() => {
                res.status(HttpStatus.FORBIDDEN).json({
                    message: 'Erro ao deletar Produto',
                });
            });
    }
}
