import {
    BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
   import { AbstractEntity } from "./Abstract";
  
import { Employee } from "./Employee";
   @Entity("address")
       export class Address extends AbstractEntity{
           @PrimaryGeneratedColumn("uuid")
           public id: string;
       
           @Column({nullable:false})//Decorator
    public address:string;
   
    @OneToOne(()=>Employee, { cascade: true })
    employee:Employee;
   
    //    @OneToOne(() => Employee, employee=>employee.address)
    //    @JoinColumn()
    //    public employee: Employee;
   
           
   }