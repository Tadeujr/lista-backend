import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AccountDto } from '../../dto/account/account.dto';
import { PersonService } from '../../services/person/person.service';

@ApiTags('Account')
@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @ApiBody({ type: AccountDto })
  @Post('newPerson')
  createPerson(@Body() data: AccountDto, @Req() req, @Res() res) {
    this.personService
      .newPerson(data)
      .then((message) => {
        res.status(HttpStatus.CREATED).json(message);
      })
      .catch(() => {
        res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: HttpStatus.FORBIDDEN });
      });
  }

  @Get('person')
  allPerson(@Req() req, @Res() res) {
    this.personService
      .allPerson()
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
