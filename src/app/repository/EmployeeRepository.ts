import { getConnection } from "typeorm";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({relations:['department','address']});
    }
    

//     async postEmployee(body:CreateEmployeeDto){
//         return getConnection().getRepository(Employee).save(body);
       
//    }

   async putEmployee(id:any,body:any){
    //const update = employeeRepo.findOne(id);
    const employeeRepo = getConnection().getRepository(Employee);
    return await employeeRepo.update(id,body);
    
    // const employeeRepo = getConnection().getRepository(Employee);
    //    const update = await employeeRepo.findOne(id); 
    //    return update.save(body);
     
      
    //    return this.propertyRepository.save({
    //      ...property, // existing fields
    //      ...updatePropertyDto // updated fields
    //    });//try to use query builder

    //  return employeeRepo.save();
   }
   async getByIdEmployee(id:any){
    const employeeRepo = getConnection().getRepository(Employee);
    return  await employeeRepo.findOne(id);


    // public async getEmployeeByName(username: string) {
    //     const employeeRepo = getConnection().getRepository(Employee);
    //     const employeeDetail = await employeeRepo.findOne({
    //         where: { name },
    //     });
    //     return employeeDetail;
    //}

   }


   public async saveEmployeeDetails(employeeDetails: Employee) {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.save(employeeDetails);
} 
public async getEmployeeByName(username: string) {
    const employeeRepo = getConnection().getRepository(Employee);
    const employeeDetail = await employeeRepo.findOne({
        where: { name:username },
    });
    return employeeDetail;
}

public async removeEmployee(id: any) {
    const employeeRepo = getConnection().getRepository(Employee);
    return  await employeeRepo.softDelete(id);
    
    // employeeDetail.softRemove;
}

   
}