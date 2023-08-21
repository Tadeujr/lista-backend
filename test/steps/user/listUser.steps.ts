import { binding, given, then, when } from 'cucumber-tsflow';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../src/services/user/user.service';
import * as jest from 'jest-mock';
import { UserDto } from '../../../src/dto/user/user.dto';
import { assert } from 'chai';


const userSend = {
    id: '591ecf04-d638-4acc-b43a-d149470819a3',
    email: 'tadeu_junior@outlook.com',
    password: 'Tadeu@123.',
    person: '591ecf04-d638-4acc-b43a-d149470819a3',
};

@binding()
export class UserSteps {

    private userService: UserService;
    private result: any;

    @given(/^que eu tenha um usuário cadastrado/)
    public async ListOfUsers(): Promise<void> {
        const module: TestingModule = await Test.createTestingModule({
          
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        listUsers: jest
                            .fn<() => Promise<UserDto>>()
                            .mockResolvedValue(userSend),
                        findOneOrFail: jest
                            .fn<() => Promise<UserDto>>()
                            .mockResolvedValue(userSend),
                        save: jest
                            .fn<() => Promise<UserDto>>()
                            .mockResolvedValue(userSend),
                    },
                },
            ],
        }).compile();

        
        this.userService = module.get<UserService>(UserService);
    }

    @when(/^eu informar o email cadastrado para busca-lo/)
    public async iRequestToListAllUsers(): Promise<void> {
        this.result = await this.userService.findOneOrFail(userSend.email);
    }

    @then(/^eu visualizo um objeto com a informações de id, email e password/)
    public async iShouldReceiveAListOfUsers(): Promise<void> {
        assert.equal(this.result,userSend, 'Not pass in List Users');
        console.log(this.result);
    }
}
