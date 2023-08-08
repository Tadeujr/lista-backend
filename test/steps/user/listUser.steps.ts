import { binding, given, then, when } from 'cucumber-tsflow';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../src/controllers/user/user.controller';
import { UserService } from '../../../src/services/user/user.service';
import * as jest from 'jest-mock';
import { UserDto } from '../../../src/dto/user/user.dto';
import { assert } from 'chai';

const newUser = {
    id: '591ecf04-d638-4acc-b43a-d149470819a3',
    email: 'tadeu_junior@outlook.com',
    password: 'Tadeu@123.',
    person: '591ecf04-d638-4acc-b43a-d149470819a3',
};

@binding()
export class UserSteps {
    private userController: UserController;
    private userService: UserService;
    private result: any;

    @given(/^que eu tenha uma lista de usuários/)
    public async ListOfUsers(): Promise<void> {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        listUsers: jest
                            .fn<() => Promise<UserDto>>()
                            .mockResolvedValue(newUser),
                        findOneOrFail: jest
                            .fn<() => Promise<UserDto>>()
                            .mockResolvedValue(newUser),
                        save: jest
                            .fn<() => Promise<UserDto>>()
                            .mockResolvedValue(newUser),
                    },
                },
            ],
        }).compile();

        this.userController = module.get<UserController>(UserController);
        this.userService = module.get<UserService>(UserService);
    }

    @when(/^eu fizer uma requisição para ver os usuário/)
    public async iRequestToListAllUsers(): Promise<void> {
        this.result = await this.userService.listUsers();
    }

    @then(/^eu visualizo uma lista de usuário/)
    public async iShouldReceiveAListOfUsers(): Promise<void> {
        assert.equal(this.result, newUser, 'Not pass in List Users');
        console.log(this.result);
    }
}
