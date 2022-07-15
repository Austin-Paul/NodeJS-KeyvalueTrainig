import { CreateDepartmentDto } from "../dto/CreateDepartment";
import { Department } from "../entities/Department";
import { DepartmentRespository } from "../repository/DepartmentRepository";
export declare class DepartmentService {
    private departmentrepo;
    constructor(departmentrepo: DepartmentRespository);
    getAllDepartments(): Promise<Department[]>;
    postDepartment(departmentDetails: CreateDepartmentDto): Promise<Department>;
    getByIdDepartment(id: string): Promise<Department>;
    putDepartment(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    removeDepartment(id: any): Promise<import("typeorm").UpdateResult>;
}
