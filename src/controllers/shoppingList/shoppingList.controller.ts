import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ShoppingListService } from '../../services/shoppingList/shoppingList.service';
import { ShoppingListDto } from '../../dto/shoppingList/shoppingList.dto';
import { ShoppingListUpdateDto } from '../../dto/shoppingList/shoppingListUpdate.dto';
import { ShoppingListfindDto } from 'src/dto/shoppingList/shoppingListFind.dto';

@ApiTags('Shoppinglist')
@Controller('shoppinglist')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
export class shoppinglistController {
    constructor(private readonly listService: ShoppingListService) {}
    @Post('newlist')
    @ApiOperation({ summary: 'Cria uma nova lista.' })
    async createList(@Body() data: ShoppingListDto, @Req() req, @Res() res) {
        await this.listService
            .createList(data)
            .then(message => {
                res.status(HttpStatus.CREATED).json(message);
            })
            .catch(() => {
                res.status(HttpStatus.FORBIDDEN).json({
                    message:
                        'Erro ao cria lista Verifique os campos do objeto criado',
                });
            });
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get('find')
    @ApiOperation({ summary: 'Busca lista a partir da data e usuário.' })
    seacherList(@Query() query: ShoppingListfindDto, @Req() req, @Res() res) {
        this.listService
            .seacherList(query.dateList, query.userId)
            .then(message => {
                res.status(HttpStatus.OK).json(message);
            })
            .catch(() => {
                res.status(HttpStatus.FORBIDDEN).json({
                    message:
                        'Erro ao buscar Lista verifique a escrita do objeto os campo id e dateList.',
                });
            });
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Busca as listas cadastradas do usuário.' })
    allListUser(@Param('userId') id: string, @Req() req, @Res() res) {
        this.listService
            .allListForUser(id)
            .then(message => {
                res.status(HttpStatus.OK).json(message);
            })
            .catch(() => {
                res.status(HttpStatus.FORBIDDEN).json({
                    message: 'id não encontrado',
                });
            });
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @ApiOperation({ summary: 'Alterar lista.' })
    alterList(
        @Param('id') id: string,
        @Body() list: ShoppingListUpdateDto,
        @Req() req,
        @Res() res,
    ) {
        this.listService
            .updateList(id, list)
            .then(message => {
                res.status(HttpStatus.OK).json(message);
            })
            .catch(() => {
                res.status(HttpStatus.FORBIDDEN).json({
                    message: 'id não encontrado',
                });
            });
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @ApiOperation({ summary: 'Deletar lista a partir de id.' })
    deleteList(@Param('id') id: string, @Req() req, @Res() res): void {
        this.listService
            .deleteList(id)
            .then(message => {
                res.status(HttpStatus.OK).json(message);
            })
            .catch(() => {
                res.status(HttpStatus.FORBIDDEN).json({
                    message: 'Erro ao deletar Lista',
                });
            });
    }
}
