import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserE } from '../../entities/user.entity';
import { UserController } from '../../controllers/user/user.controller';
import { UserService } from '../../services/user/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserE])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UsersModule {}
