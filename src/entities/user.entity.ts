import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import PersonE from './person.entity';
import { ShoppingListE } from './shoppingList.entity';

@Entity()
export class UserE{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login:string;

    @Column()
    password:string;

    @OneToOne(()=>PersonE, person => person.id)
    @JoinColumn()
    person:PersonE;

    @IsNotEmpty()
    @OneToMany(() => ShoppingListE,list=>list.id)
    list:ShoppingListE[];


}