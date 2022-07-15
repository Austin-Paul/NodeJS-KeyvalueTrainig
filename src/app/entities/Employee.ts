import {
 BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./Abstract";
import { Address } from "./Address";
import { Department } from "./Department";
@Entity("employee")
    export class Employee extends AbstractEntity{
        @PrimaryGeneratedColumn("uuid")
        public id: string;
    
        @Column({ nullable: false })
        public name: string;

        @Column({ nullable: false })
        public departmentId: string;

        @Column({ nullable: true })
        public password: string;

        @Column({ nullable: true })
        public role: string;

        @Column({nullable: true})
        public address_id:number;

    @ManyToOne(() => Department, { cascade: true })
    @JoinColumn()
    public department: Department;
    
    @OneToOne(()=>Address, { cascade: true })
    address:Address;

        
}