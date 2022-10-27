import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ListE{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    total:number;
    
    @Column()
    dateList: string;
}