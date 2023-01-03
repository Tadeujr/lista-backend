import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserE } from 'src/entities/user.entity';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserE)
        private readonly userRepository: Repository<UserE>
    
      ) { }
    
      async listUsers(): Promise<UserE[]> {
        
    
        return await this.userRepository.find({
            select: ['id', 'email'],
          });
      }


      async findOneOrFail(
        options: FindOneOptions<UserE>,
      ) {
        try {
          return await this.userRepository.findOneOrFail( options);
        } catch (error) {
          throw new NotFoundException(error.message);
        }
      }

      async createUser(data: UserE) {
        const user = this.userRepository.create(data);
        return await this.userRepository.save(user);
      }
    
      async updateUser(id: string, data: UserE) {
        const user = await this.findOneOrFail({where: {id}});
        this.userRepository.merge(user, data);
        return await this.userRepository.save(user);
      }


      async deleteUser(id: string): Promise<any> {
        await this.userRepository.findOneOrFail({where: {id}});
        this.userRepository.softDelete({ id });
      }
    
}


