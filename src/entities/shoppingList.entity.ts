import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductE } from './product.entity';
import { UserE } from './user.entity';

@Entity({ name: 'shoppingList' })
export class ShoppingListE {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    total: number;

    @Column()
    dateList: string;

    @ManyToOne(() => UserE, user => user)
    user: UserE;

    @OneToMany(() => ProductE, products => products)
    products: ProductE[];
}
