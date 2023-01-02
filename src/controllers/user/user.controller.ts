import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';

@Controller('api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async index() {
      return await this.userService.listUsers();
    }
  
    // @Post()
    // async store(@Body() body: CreateUserDto) {
    //   return await this.usersService.store(body);
    // }
  
    // @Get(':id')
    // async show(@Param('id', new ParseUUIDPipe()) id: string) {
    //   return await this.usersService.findOneOrFail({ id });
    // }
  
    // @Put(':id')
    // async update(
    //   @Param('id', new ParseUUIDPipe()) id: string,
    //   @Body() body: UpdateUserDto,
    // ) {
    //   return await this.usersService.update(id, body);
    // }
  
    // @Delete(':id')
    // @HttpCode(HttpStatus.NO_CONTENT)
    // async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    //   await this.usersService.destroy(id);
    // }
}
// criar o usuario primeiro e depois add o Person
//depois dou upadate nas infor de FK de Person em user
