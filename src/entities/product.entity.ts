import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { ShoppingListE } from './shoppingList.entity';
import { Product } from 'src/dto/product/product.dto';


@Entity({name:"product"})
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

  @IsString()
  @IsNotEmpty()
  @Column()
  brand:string;

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



  @ManyToOne(() => ShoppingListE, (list) => list)
  list: ShoppingListE;

}
