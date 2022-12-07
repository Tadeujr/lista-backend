import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";
import {Entity, Column, OneToMany, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from "typeorm";
import { ProductE } from "./product.entity";
import { UserE } from "./user.entity";

@Entity()
export class ShoppingListE{
    @PrimaryGeneratedColumn()
    id:number;
    
    
    @IsInt()
    @IsNotEmpty()
    @Column()
    total:number;
    
    @IsString()
    @IsNotEmpty()
    @Column()
    dateList: string;
    
    @IsString()
    @IsNotEmpty()
    @ManyToOne(()=>UserE, (user) => user)
    user:UserE;

    @IsString()
    @OneToMany(() => ProductE, (product) => product)
    products: ProductE[];
}