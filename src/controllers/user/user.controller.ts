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
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../services/user/user.service';
import { UserUpdateDto } from '../../dto/user/userUpdate.dto';

@ApiTags('User')
@Controller('user')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Busca usuário por id.' })
  async showUser(@Param('id', new ParseUUIDPipe()) id: string, @Res() res) {
    return await this.userService
      .findOneOrFail({ where: { id } })
      .then((message) => {
        res.status(HttpStatus.CREATED).json(message);
      })
      .catch(() => {
        res.status(HttpStatus.FORBIDDEN).json({
          message: 'Erro ao cria lista Verifique os campos do objeto criado.',
        });
      });
    //return await this.userService.findOneOrFail({ where: { id } });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Alterar senha do login.' })
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UserUpdateDto,
  ) {
    return await this.userService.updateUser(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar usuário.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroyUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.deleteUser(id);
  }
}
