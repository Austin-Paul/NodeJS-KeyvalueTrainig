import { Employee } from "../entities/Employee";
export declare class EmployeeRespository {
    getAllEmployees(): Promise<Employee[]>;
    putEmployee(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    getByIdEmployee(id: any): Promise<Employee>;
    saveEmployeeDetails(employeeDetails: Employee): Promise<Employee>;
    getEmployeeByName(username: string): Promise<Employee>;
    removeEmployee(id: any): Promise<import("typeorm").UpdateResult>;
}
