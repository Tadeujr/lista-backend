import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
} from 'typeorm';
import PersonE from './person.entity';
import { ShoppingListE } from './shoppingList.entity';
import { hashSync } from 'bcrypt';

@Entity({ name: 'user' })
export class UserE {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;
 
  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToOne(() => PersonE, (person) => person)
  @JoinColumn()
  person: PersonE;

  @OneToMany(() => ShoppingListE, (list) => list)
  list: ShoppingListE[];


  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
