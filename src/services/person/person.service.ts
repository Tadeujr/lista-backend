import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountDto } from 'src/dto/account/account.dto';
import PersonDto from 'src/dto/person/person.dto';
import PersonE from 'src/entities/person.entity';
import { UserE } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../../dto/user/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PersonService {


    constructor(
        @InjectRepository(PersonE)
        private readonly personRepository: Repository<PersonE>,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        
      ) {}
    

      
    async newPerson(data:any):Promise<UserE>{
        let account = this.newAccount(data)
        return account;
    }

    async allPerson():Promise<PersonE[]>{
        return  await this.personRepository.query(`select * from "person"`);
    }
    


    private async newAccount(data:AccountDto){
        const person = new PersonDto()
        person.name = data.name
        person.city = data.city;
        person.uf= data.uf;
        person.zipcode= data.zipcode;
        

        
        const newPerson = await this.personRepository.save(person)
        

        const newUser = new UserDto()
        newUser.email = data.email;
        newUser.password =  data.password;
        newUser.person = newPerson.id; //receiving person id


        return await this.createUser(newUser)
        
    }


    private async createUser(user:UserDto):Promise<UserE>{
        let newUser = await this.userService.createUser(user);
        return  newUser
    
    }
}