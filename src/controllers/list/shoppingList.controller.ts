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
import { ShoppingListDto } from 'src/dto/list/list.dto';
import { ShoppingListE } from 'src/entities/shoppingList.entity';
import { ShoppingListService } from '../../services/list/shoppingList.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('api/v1/list')
export class shoppinglistController {
  constructor(private readonly listService: ShoppingListService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createList(@Body() list:ShoppingListDto,@Req() req, @Res() res) {
    
    this.listService
      .createList(list)
      .then((message) => {
        res.status(HttpStatus.CREATED).json(message);
      })
      .catch(() => {
        res
          .status(HttpStatus.FORBIDDEN)
          .json({ message:"Erro ao cria lista Verifique os campos do objeto criado"});
      });
  }




  @Get("allList")
  allList( @Req() req,@Res() res){
    this.listService.allList()
    .then(message => {
      res.status(HttpStatus.OK).json(message);
    })
    .catch(() => {
      res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Erro ao buscar Lista verifique a escrita do objeto os campo id e dateList." });
    });
  }

  @Get("find")
  seacherList( @Body() list,@Req() req,@Res() res){
    this.listService.seacherList(list)
    .then(message => {
      res.status(HttpStatus.OK).json(message);
    })
    .catch(() => {
      res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Erro ao buscar Lista verifique a escrita do objeto os campo id e dateList." });
    });

  }

  @Get(":id")
  allListUser( @Param("id") id:string,@Req() req,@Res() res){
    this.listService.allListForUser(id)
    .then(message => {
      res.status(HttpStatus.OK).json(message);
    })
    .catch(() => {
      res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "id não encontrado" });
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(":id")
  alterList( @Param('id') id:string ,
  @Body() list: ShoppingListE,@Req() req,@Res() res){
    this.listService.updateList(id,list).then(message =>{
      res.status(HttpStatus.OK).json(message)
    }).catch(() => {
      res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "id não encontrado" });
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(":id")
  deleteList(@Param("id") id:string,@Req() req,@Res() res): void{
    this.listService.deleteList(id).then(message => {
      res.status(HttpStatus.OK).json(message);
    })
    .catch(() => {
      res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Erro ao deletar Lista" });
    });
  }

}
