import {
  Column, Entity, OneToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { UserE } from './user.entity';

@Entity({ name: 'person' })
export default class PersonE {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  zipcode: string;

  @OneToOne(() => UserE, (person) => person)
  userFk: string;
}
