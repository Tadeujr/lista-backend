import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Product } from '../models/product/product.model';

@Entity()
export class ListE{
    @PrimaryGeneratedColumn()
    id:number;
    
    @IsInt()
    @IsNotEmpty()
    @Column()
    idUser:number

    @Column()
    product:Product[]

    @IsInt()
    @IsNotEmpty()
    @Column()
    total:number;
    
    @IsString()
    @IsNotEmpty()
    @Column()
    dateList: string;
}