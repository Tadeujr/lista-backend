import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserUpdateDto } from 'src/dto/user/userUpdate.dto';
import { UserService } from 'src/services/user/user.service';

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

