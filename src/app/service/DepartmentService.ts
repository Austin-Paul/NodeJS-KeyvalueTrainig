
// export class DepartmentService{
    // getAllDepartment(){
    //     const departmentResp = [
    //         {
    //             "id": "af168383-b350-4894-8ca3-34811ffa34ac",
    //             "name": "Rahul",
    //             "joiningDate": "2021-07-15T14:48:00.000Z",
    //             "role": "dev",
    //             "experience": 1,
    //             "status": "Active",
    //             "designation": 'Associate',
    //             "departmentProofUrl": "erer",
    //             "email": "test@test.com",
    //             "password": "123456",
    //             "departments": []
    //         },
    //         {
    //             "id": "763a5477-c283-4724-94ce-6dc7a5688685",
    //             "name": "hawari",
    //             "joiningDate": "2020-01-08T10:53:09.506Z",
    //             "role": "dev",
    //             "experience": 5,
    //             "status": "Active",
    //             "designation": "Senior",
    //             "departmentProofUrl": "http://",
    //             "email": "test@gmail.com",
    //             "password": "teereddf",
    //             "departments": [
    //                 {
    //                     "id": "b4fec1fd-5921-4c0e-883c-0904c4a70bad",
    //                     "name": "developers"
    //                 }
    //             ]
    //         }
    //     ]
    //     return departmentResp;
    // }
    // postDepartment(){
    //     const message="Post Success";
    //     return message;
    // }
    // }
    import { plainToClass } from "class-transformer";
import { CreateDepartmentDto } from "../dto/CreateDepartment";
import { Department } from "../entities/Department";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { DepartmentRespository } from "../repository/DepartmentRepository";
import { ErrorCodes } from "../util/errorCode";
    export class DepartmentService{
        
        constructor(private departmentrepo:DepartmentRespository){
            
        }
        async getAllDepartments(){
            return this.departmentrepo.getAllDepartments();
        }

        async postDepartment(departmentDetails:CreateDepartmentDto){
            try {
                const newdepartment = plainToClass(Department, {
                    name: departmentDetails.name,
                    
                    isActive: true,
                });
            return this.departmentrepo.postDepartments(newdepartment);
        }
    catch (err) {
        //throw new HttpException(400, "Failed to create department");
        }

    }

        async getByIdDepartment(id:string){
            const department= await this.departmentrepo.getByIdDepartment(id);
            if(!department)
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
            return department;
        }

        async putDepartment(id:any,body:any){
            return await this.departmentrepo.putDepartment(id,body);
            
        }
        async removeDepartment(id:any){
            return await this.departmentrepo.removeDepartment(id);
            
        }
        
    }
