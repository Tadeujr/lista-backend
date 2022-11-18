import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { ShoppingListE } from './shoppingList.entity';


@Entity()
export class ProductE {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  store: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  productName: string;

  @IsInt()
  @IsNotEmpty()
  @Column({ type: 'float' })
  price: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  buyDate: string;

  @IsInt()
  @IsNotEmpty()
  @Column({ type: 'integer' })
  unity: number;

  @IsBoolean()
  @IsNotEmpty()
  @Column({type:'boolean'})
  wasAcquired:boolean;

  @IsNotEmpty()
  @ManyToOne(() => ShoppingListE,{ eager: true, cascade: true, onDelete: "CASCADE" })
  @JoinColumn({name:"list"})
  list: number;

}
