import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/controllers/user/user.controller';
import { UserService } from '../../src/services/user/user.service';


const newUser = {
    id: '591ecf04-d638-4acc-b43a-d149470819a3',
    email: 'tadeu_junior@outlook.com',
    password: 'Tadeu@123.',
    person: '591ecf04-d638-4acc-b43a-d149470819a3',
};

const newUserList = [
    {
        id: '591ecf04-d638-4acc-b43a-d149470819a3',
        email: 'tadeu_junior@outlook.com',
        password: 'Tadeu@123.',
        person: '591ecf04-d638-4acc-b43a-d149470819a3',
    },
];

describe('AuthService', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        listUsers: jest.fn().mockResolvedValue(newUser),
                        findOneOrFail: jest.fn().mockResolvedValue(newUser),
                        save: jest.fn().mockResolvedValue(newUser),
                        delete: jest.fn().mockResolvedValue(newUser.id),
                    },
                },
            ],
        }).compile();

        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
        expect(userController).toBeDefined();
    });

    describe('List Users', () => {
        it('should return a user entity list successfully', async () => {
            const result = await userService.listUsers();

            expect(result).toEqual(newUserList[0]);
            expect(typeof result).toEqual('object');
            expect(userService.listUsers).toHaveBeenCalledTimes(1);
        });
    });
});
