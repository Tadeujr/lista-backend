import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user/user.controller';
import { UserE } from 'src/entities/user.entity';
import { UserService } from 'src/services/user/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserE]),],
    controllers: [UserController],
    providers: [UserService],
    exports:[UserService]
  })
export class UsersModule {}
