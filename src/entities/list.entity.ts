import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProductE } from "./product.entity";

@Entity()
export class ListE{
    @PrimaryGeneratedColumn()
    id:number;
    
    @IsInt()
    @IsNotEmpty()
    @Column()
    idUser:number

    @IsArray()
    @Column()
    product:ProductE[]

    @IsInt()
    @IsNotEmpty()
    @Column()
    total:number;
    
    @IsString()
    @IsNotEmpty()
    @Column()
    dateList: string;
}