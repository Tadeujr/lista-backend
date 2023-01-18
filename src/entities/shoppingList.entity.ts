import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ProductE } from './product.entity';
import { UserE } from './user.entity';

@Entity({ name: 'shoppingList' })
export class ShoppingListE {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  dateList: string;

  @ManyToOne(() => UserE, (user) => user)
  user: UserE;

  @OneToMany(() => ProductE, (product) => product)
  products: ProductE[];
}
