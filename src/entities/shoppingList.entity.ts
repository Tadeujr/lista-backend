import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";
import {Entity, Column, OneToMany, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from "typeorm";
import { ProductE } from "./product.entity";
import { UserE } from "./user.entity";

@Entity({name:"shoppingList"})
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
    
    
    @IsNotEmpty()
    @ManyToOne(()=>UserE, (user) => user)
    user:UserE;

    
    @OneToMany(() => ProductE, (product) => product)
    products: ProductE[];
}