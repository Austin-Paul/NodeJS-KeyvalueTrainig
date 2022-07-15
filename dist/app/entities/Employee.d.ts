import { AbstractEntity } from "./Abstract";
import { Address } from "./Address";
import { Department } from "./Department";
export declare class Employee extends AbstractEntity {
    id: string;
    name: string;
    departmentId: string;
    password: string;
    role: string;
    address_id: number;
    department: Department;
    address: Address;
}
