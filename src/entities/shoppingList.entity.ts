import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";
import {Entity, Column, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { ProductE } from "./product.entity";

@Entity()
export class ShoppingListE{
    @PrimaryGeneratedColumn()
    id:number;
    
    @IsInt()
    @IsNotEmpty()
    @Column()
    idUser:number

    @IsInt()
    @IsNotEmpty()
    @Column()
    total:number;
    
    @IsString()
    @IsNotEmpty()
    @Column()
    dateList: string;
    

}