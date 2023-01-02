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
} from '@nestjs/common';
import { ShoppingList } from 'src/dto/list/list.dto';
import { ShoppingListE } from 'src/entities/shoppingList.entity';
import { ShoppingListService } from '../../services/list/shoppingList.service';


@Controller('list')
export class shoppinglistController {
  constructor(private readonly listService: ShoppingListService) {}


  @Post()
  createList(@Body() list:ShoppingList,@Req() req, @Res() res) {
    
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
  allList( @Param("id") id:number,@Req() req,@Res() res){
    this.listService.allList(id)
    .then(message => {
      res.status(HttpStatus.OK).json(message);
    })
    .catch(() => {
      res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "id não encontrado" });
    });
  }

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

  @Delete(":id")
  deleteList(@Param("id") id:number,@Req() req,@Res() res){
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
