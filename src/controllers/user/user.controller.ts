import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from 'src/dto/user/user.dto';
import { UserService } from 'src/services/user/user.service';


@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async indexUsers() {
    return await this.userService.listUsers();
  }

  @Post()
  async storeUser(@Body() body: UserDto) {
    return await this.userService.createUser(body);
  }

  @Get(':id')
  async showUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findOneOrFail({ where: { id } });
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UserDto,
  ) {
    return await this.userService.updateUser(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroyUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.deleteUser(id);
  }
}
//CHOGZBDOGTZQEH
// criar o usuario primeiro e depois add o Person
//depois dou upadate nas infor de FK de Person em user
