import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../../dto/user/user.dto';
import { UserService } from '../user/user.service';

import { AccountDto } from '../../dto/account/account.dto';
import { UserE } from '../../entities/user.entity';
import PersonDto from '../../dto/person/person.dto';
import PersonE from '../../entities/person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonE)
    private readonly personRepository: Repository<PersonE>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async newPerson(data: AccountDto): Promise<UserE> {
    const account = this.newAccount(data);
    return account;
  }

  async allPerson(): Promise<PersonE[]> {
    return await this.personRepository.query(`select * from "person"`);
  }

  private async newAccount(data: AccountDto): Promise<UserE> {
    const person = new PersonDto();
    person.name = data.name;
    person.city = data.city;
    person.uf = data.uf;
    person.zipcode = data.zipcode;

    const newPerson = await this.personRepository.save(person);

    const newUser = new UserDto();
    newUser.email = data.email;
    newUser.password = data.password;
    newUser.person = newPerson.id; //receiving person id

    return await this.createUser(newUser);
  }

  private async createUser(user: UserDto): Promise<UserE> {
    const newUser = await this.userService.createUser(user);
    return newUser;
  }
}
