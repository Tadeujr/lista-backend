import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from '../../controllers/person/person.controller';
import { PersonService } from '../../services/person/person.service';
import { UsersModule } from '../users/users.module';
import PersonE from '../../../dist/entities/person.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([PersonE])],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {}
