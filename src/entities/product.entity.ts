import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ShoppingListE } from './shoppingList.entity';

@Entity({ name: 'product' })
export class ProductE {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ type: 'integer' })
  unity: number;

  @Column({ type: 'boolean' })
  wasAcquired: boolean;

  @ManyToOne(() => ShoppingListE, (list) => list)
  list: ShoppingListE;
}
