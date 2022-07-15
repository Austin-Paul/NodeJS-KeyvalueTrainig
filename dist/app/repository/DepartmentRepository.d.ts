import { Department } from "../entities/Department";
export declare class DepartmentRespository {
    getAllDepartments(): Promise<Department[]>;
    postDepartments(departmentDetails: Department): Promise<Department>;
    putDepartment(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    getByIdDepartment(id: any): Promise<Department>;
    removeDepartment(id: any): Promise<import("typeorm").UpdateResult>;
}
