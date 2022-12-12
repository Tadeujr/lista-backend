import {IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { UserE } from './user.entity';


@Entity()
export default class PersonE{
    @PrimaryGeneratedColumn()
    id: number;    

    @IsString()
    @IsNotEmpty()
    @Column()
    name:string;

    @IsString()
    @IsNotEmpty()
    @Column()
    city:string;

    @IsString()
    @IsNotEmpty()
    @Column()
    uf:string;

    @IsString()
    @IsNotEmpty()
    @Column()
    zipcode:string


    @OneToOne(()=>UserE, user => user)
    @JoinColumn()
    userFk:UserE;

}

