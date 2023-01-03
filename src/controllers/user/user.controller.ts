import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { UserE } from '../../entities/user.entity';

@Controller('api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async indexUsers() {
      return await this.userService.listUsers();
    }
  
    @Post()
    async storeUser(@Body() body: UserE) {
      return await this.userService.createUser(body);
    }

    @Get(':id')
    async showUser(@Param('id', new ParseUUIDPipe()) id: string) {
      return await this.userService.findOneOrFail({where: {id}});
    }
  
    @Put(':id')
    async updateUser(
      @Param('id', new ParseUUIDPipe()) id: string,
      @Body() body: UserE,//cria classe DTO
    ) {
      return await this.userService.updateUser(id, body);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroyUser(@Param('id', new ParseUUIDPipe()) id: string) {
      await this.userService.deleteUser(id);
    }
}
// criar o usuario primeiro e depois add o Person
//depois dou upadate nas infor de FK de Person em user
