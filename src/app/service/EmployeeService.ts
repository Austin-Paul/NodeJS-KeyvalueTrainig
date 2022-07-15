
import { plainToClass } from "class-transformer";
import { EntityNotFoundError } from "typeorm";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from 'bcrypt'
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import jsonwebtoken from "jsonwebtoken";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import { AddressService } from "./AddressService";
import { CreateAddressDto } from "../dto/CreateAddress";
// import { AddressService } from "../service/AddressService";


//     postEmployee(){
//         const message="Post Success";
//         return message;
//     }
//     }

export class EmployeeService{
    constructor(private employeerepo:EmployeeRespository){
        
    }
    private addressService= new AddressService();
    async getAllEmployees(){
        const employee=await this.employeerepo.getAllEmployees();
        if(!employee)
        throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        return employee;
    }

    // async postEmployee(request:any){
    //     return await this.employeerepo.postEmployee(request);
        
    // }

    public async createEmployee(employeeDetails: CreateEmployeeDto) {
        console.log(employeeDetails);
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
                // age: employeeDetails.age,
                departmentId: employeeDetails.departmentId,
                role:employeeDetails.role,
                isActive: true,
            });
            console.log(newEmployee);
            const save:Employee  = await this.employeerepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee");
        }
    }


    async getByIdEmployee(id:any){
        const employee= await this.employeerepo.getByIdEmployee(id);
        if(!employee)
        throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        return employee;
    }


    async putEmployee(id:any,body:any){
        return await this.employeerepo.putEmployee(id,body);
        
    }

    async removeEmployee(id:any){
        return await this.employeerepo.removeEmployee(id);
        
    }


    public employeeLogin = async (
        name: string,
        password: string      ) => {
        const employeeDetails = await this.employeerepo.getEmployeeByName(
          name
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "role":employeeDetails.role,
          };
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException();
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };  
    
      //Address


      async getEmpAddr(){
        return this.addressService.getAllAddress();
      }

      async createEmployeeAddress(id:string, body:CreateAddressDto)
      {
        const data=await this.employeerepo.getByIdEmployee(id);
        if(!data)
        throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        return this.addressService.createAddress(body);
        //return this.addressService.createAddress(data.address,body);
      }
}