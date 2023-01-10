import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserE } from 'src/entities/user.entity';
import { FindOneOptions, UpdateResult, Repository } from 'typeorm';
import { UserDto } from '../../dto/user/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserE)
    private readonly userRepository: Repository<UserE>,
  ) {}

  async listUsers(): Promise<UserE[]> {
    return await this.userRepository.find({
      select: ['id', 'email'],
    });
  }

  async findOneOrFail(options: FindOneOptions<UserE>) {
    try {
      return await this.userRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async createUser(data: UserDto):Promise<UserE> {
    const user = await this.userRepository.create(data);
    return await this.userRepository.save(user);
  }



  async updateUser(id, data): Promise<UserE> {
    const user = await this.findOneOrFail({ where: { id } });
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }
}
