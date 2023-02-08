import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShoppingListE } from './shoppingList.entity';

@Entity({ name: 'product' })
export class ProductE {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  store: string;

  @Column()
  productName: string;

  @Column()
  brand: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  buyDate: string;

  @Column({ type: 'float' })
  unity: number;

  @Column()
  commercialUnit: string;

  @Column({ type: 'boolean' })
  wasAcquired: boolean;

  @ManyToOne(() => ShoppingListE, (list) => list)
  @JoinColumn({ name: 'list' })
  list: ShoppingListE;
}
