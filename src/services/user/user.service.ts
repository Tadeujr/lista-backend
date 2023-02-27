import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { FindOneOptions, Repository, DeleteResult } from 'typeorm';
import { UserDto } from '../../dto/user/user.dto';
import { UserE } from '../../entities/user.entity';
import { UserUpdateDto } from '../../dto/user/userUpdate.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserE)
        private readonly userRepository: Repository<UserE>,
    ) {}

    async listUsers(): Promise<UserE[]> {
        return await this.userRepository.find({
            select: ['id', 'email', 'password', 'person'],
        });
    }

    async findOneOrFail(options: FindOneOptions<UserE>) {
        try {
            return await this.userRepository.findOneOrFail(options);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async createUser(data: UserDto): Promise<UserE> {
        try {
            const user = await this.userRepository.create(data);
            return await this.userRepository.save(user);
        } catch (error) {
            throw new NotFoundException('O email já está cadastrado.');
        }
    }

    async updateUser(id: string, data: UserUpdateDto) {
        try {
            const user = await this.userRepository.findOneOrFail({
                where: { id },
            });
            data.password = hashSync(data.password, 10);
            const updateuser = await this.userRepository.merge(user, data);

            return await this.userRepository.save(updateuser);
        } catch (error) {
            throw new NotFoundException(
                'Usuario não encontrado, verifique o id.',
            );
        }
    }

    async deleteUser(id): Promise<DeleteResult> {
        try {
            const user = await this.userRepository.findOneOrFail({
                where: { id },
            });

            return await this.userRepository.delete(user.id);
        } catch (error) {
            throw new NotFoundException(
                'Usuario não encontrado, verifique o id.',
            );
        }
    }
}
