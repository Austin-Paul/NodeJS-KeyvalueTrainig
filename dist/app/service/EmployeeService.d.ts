import { Employee } from "../entities/Employee";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import { CreateAddressDto } from "../dto/CreateAddress";
export declare class EmployeeService {
    private employeerepo;
    constructor(employeerepo: EmployeeRespository);
    private addressService;
    getAllEmployees(): Promise<Employee[]>;
    createEmployee(employeeDetails: CreateEmployeeDto): Promise<Employee>;
    getByIdEmployee(id: any): Promise<Employee>;
    putEmployee(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    removeEmployee(id: any): Promise<import("typeorm").UpdateResult>;
    employeeLogin: (name: string, password: string) => Promise<{
        idToken: string;
        employeeDetails: Employee;
    }>;
    private generateAuthTokens;
    getEmpAddr(): Promise<[import("../entities/Address").Address[], number]>;
    createEmployeeAddress(id: string, body: CreateAddressDto): Promise<import("../entities/Address").Address>;
}
