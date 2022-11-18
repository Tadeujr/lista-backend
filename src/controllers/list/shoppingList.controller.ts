import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { List } from 'src/models/list/list.model';
import { ShoppingListService } from '../../services/list/shoppingList.service';

@Controller('list')
export class shoppinglistController {
  constructor(private readonly listService: ShoppingListService) {}

  // @Get()
  // listProducts(@Req() req,@Res() res) {
  //     //console.log(req)
  //     this.listService
  //       .listProducts()
  //       .then(message => {
  //         res.status(HttpStatus.OK).json(message);
  //       })
  //       .catch(() => {
  //         res
  //           .status(HttpStatus.FORBIDDEN)
  //           .json({ message: "Produtos" });
  //       });
  //   }

  @Post()
  createList(@Body() List, @Req() req, @Res() res) {
    
    this.listService
      .createList(List)
      .then((message) => {
        res.status(HttpStatus.CREATED).json(message);
      })
      .catch(() => {
        res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: HttpStatus.FORBIDDEN });
      });
  }

  
}
