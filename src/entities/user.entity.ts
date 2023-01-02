import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import PersonE from './person.entity';
import { ShoppingListE } from './shoppingList.entity';

@Entity({name:"user"})
export class UserE{
    @PrimaryGeneratedColumn()
    id: number;

    @IsEmail()
    @IsNotEmpty()
    @Column()
    email:string

    @IsString()
    @IsNotEmpty()
    @Column()
    password:string;

    @IsString()
    @IsNotEmpty()
    @OneToOne(()=>PersonE, person => person)
    @JoinColumn()
    person:PersonE;

    @IsNotEmpty()
    @OneToMany(() => ShoppingListE,list=>list)
    list:ShoppingListE[];


}