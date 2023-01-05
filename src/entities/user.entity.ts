import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { RegexHelper } from 'src/util/regex';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, PrimaryColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import PersonE from './person.entity';
import { ShoppingListE } from './shoppingList.entity';

@Entity({name:"user"})
export class UserE{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsEmail()
    @IsNotEmpty()
    @Column()
    email:string

    @Matches(RegexHelper.password)
    @IsString()
    @IsNotEmpty()
    @Column()
    password:string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
  
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    @IsString()
    @IsNotEmpty()
    @OneToOne(()=>PersonE, person => person)
    @JoinColumn()
    person:PersonE;

    @IsNotEmpty()
    @OneToMany(() => ShoppingListE,list=>list)
    list:ShoppingListE[];


}