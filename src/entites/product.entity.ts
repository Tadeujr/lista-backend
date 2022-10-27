import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductE {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  store: string;

  @Column({ type: 'varchar' })
  productName: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'varchar' })
  buyDate: string;

  @Column({ type: 'integer' })
  unity: number;
}
