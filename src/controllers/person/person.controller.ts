import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import PersonDto from 'src/dto/person/person.dto';
import { PersonService } from '../../services/person/person.service';
import { AccountDto } from '../../dto/account/account.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('Account')
@Controller()
export class PersonController {
    constructor(private readonly personService: PersonService){}

    @ApiBody({ type: AccountDto })
    @Post('newPerson')
    createPerson(@Body() data: AccountDto, @Req() req, @Res() res) {       

        this.personService.newPerson(data)
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
    allPerson( @Req() req, @Res() res) {
      console.log()
      this.personService.allPerson()
        .then((message) => {
          res.status(HttpStatus.CREATED).json(message);
        })
        .catch(() => {
          res
            .status(HttpStatus.FORBIDDEN)
            .json({ message: HttpStatus.FORBIDDEN });
        });
  } 
      //  @UseGuards(AuthGuard('jwt'))
}
