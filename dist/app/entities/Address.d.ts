import { AbstractEntity } from "./Abstract";
import { Employee } from "./Employee";
export declare class Address extends AbstractEntity {
    id: string;
    address: string;
    employee: Employee;
}
