import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductE {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  store: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  productName: string;

  @IsInt()
  @IsNotEmpty()
  @Column({ type: 'float' })
  price: number;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  buyDate: string;

  @IsInt()
  @IsNotEmpty()
  @Column({ type: 'integer' })
  unity: number;
}
