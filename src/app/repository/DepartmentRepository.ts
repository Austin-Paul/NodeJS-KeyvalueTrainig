import { getConnection } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRespository{
    async getAllDepartments(){
         const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find({relations:['employee']});
    }

     async postDepartments(departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    } 

    async putDepartment(id:any,body:any){
        //const update = departmentRepo.findOne(id);
        const DepartmentRepo = getConnection().getRepository(Department);
        return await DepartmentRepo.update(id,body);
    }

    async getByIdDepartment(id:any){
        const departmentRepo = getConnection().getRepository(Department);
        return  await departmentRepo.findOne(id);
    }

    public async removeDepartment(id: any) {
        const departmentRepo = getConnection().getRepository(Department);
        return  await departmentRepo.softDelete(id);
        
        
    }
    }