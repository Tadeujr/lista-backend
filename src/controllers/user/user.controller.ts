import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { UserDto } from 'src/dto/user/user.dto';
import { UserService } from 'src/services/user/user.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserUpdateDto } from 'src/dto/user/userUpdate.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //Remover Rota
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async indexUsers() {
    return await this.userService.listUsers();
  }

  // @Post()
  // async storeUser(@Body() body: UserDto) {
  //   return await this.userService.createUser(body);
  // }


  @Get(':id')
  async showUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findOneOrFail({ where: { id } });
  }


  @Patch(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UserUpdateDto,
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
