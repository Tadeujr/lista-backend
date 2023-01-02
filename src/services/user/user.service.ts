import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserE } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserE)
        private readonly produtoRepository: Repository<UserE>
    
      ) { }
    
      async listUsers(): Promise<UserE[]> {
        
    
        return await this.produtoRepository.find({
            select: ['id', 'email'],
          });
      }
}
