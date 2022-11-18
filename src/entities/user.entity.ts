import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import PersonE from './person.entity';

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
    personFk:PersonE;

}