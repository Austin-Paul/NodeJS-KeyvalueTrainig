import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import authorize from "../middleware/authorizationMiddleware";
import { UpdateEmployeeDto } from "../dto/UpdateEmployee";
import { roles } from "../constants/roles";
import { CreateAddressDto } from "../dto/CreateAddress";
import { AddressService } from "../service/AddressService";

class EmployeeController extends AbstractController {
  constructor(private employeeService:EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {

   
    this.router.get(`${this.path}`, 
     authorize([roles.admin,roles.hr,roles.manager,roles.manager]),
     validationMiddleware(CreateEmployeeDto, 'body'),
    this.getAllEmployee);


    

  
     this.router.post(`${this.path}`, 
     authorize([roles.admin,roles.hr]),
      validationMiddleware(CreateEmployeeDto, 'body'),
     this.postEmployee);

     

     this.router.get(`${this.path}/:id`, 
     authorize([roles.admin,roles.hr]),
      validationMiddleware(CreateEmployeeDto, 'body'),
     this.getByIdEmployee);

     

     this.router.put(`${this.path}/:id`,
     authorize([roles.admin, roles.hr]),
     validationMiddleware(UpdateEmployeeDto, 'body'), 
     this.putEmployee);

     this.router.delete(`${this.path}/:id`,
     authorize([roles.admin,roles.hr]),
     validationMiddleware(UpdateEmployeeDto, 'body'), 
     this.removeEmployee);

     this.router.post(
      `${this.path}/login`,
      this.login
    );





    //Address



    this.router.get(`${this.path}/address`, 
     authorize([roles.admin,roles.hr,roles.manager,roles.manager]),
     validationMiddleware(CreateAddressDto, 'body'),
    this.getAllAddress);

    this.router.get(`${this.path}/:id/address`, 
    authorize([roles.admin,roles.hr]),
     validationMiddleware(CreateAddressDto, 'body'),
    this.getByIdEmployee);

    this.router.post(`${this.path}/address`, 
    authorize([roles.admin,roles.hr]),
     validationMiddleware(CreateAddressDto, 'body'),
    this.createAddress);


    this.router.get(`${this.path}/:id/address`, 
    authorize([roles.admin,roles.hr]),
     validationMiddleware(CreateAddressDto, 'body'),
    this.getByIdEmployee)
  }



  private getAllEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Get"};
      response.status(200);
      response.send(await this.employeeService.getAllEmployees());
    } catch (error) {
      return next(error);
    }
  }

   private postEmployee= async (request: RequestWithUser, response: Response, next: NextFunction) => {
     try {
       const data: any = { message: "post"};
       response.status(200);
       response.send(this.employeeService.createEmployee(request.body));
     } catch (error) {
      return next(error);
      }  
   }

  


   private getByIdEmployee= async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "post"};
      response.status(200);
      //response.send(this.employeeService.getByIdEmployee(request.params.id));
      response.send(this.fmt.formatResponse(await this.employeeService.getByIdEmployee(request.params.id), Date.now() - request.startTime, "OK" ))
    } catch (error) {
     return next(error);
     }  
  }


  private putEmployee= async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "post"};
      response.status(200);
      //response.send(this.employeeService.getByIdEmployee(request.params.id));
      response.send(this.fmt.formatResponse(await this.employeeService.putEmployee(request.params.id,request.body), Date.now() - request.startTime, "OK" ))
    } catch (error) {
     return next(error);
     }  
  }

  private removeEmployee= async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "post"};
      response.status(200);
      
      response.send(await this.employeeService.removeEmployee(request.params.id));
    } catch (error) {
     return next(error);
     }  
  }

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const loginData = request.body;
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.name,
      loginData.password,
  
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
  };


  private createAddress = async (
    request : RequestWithUser,
    response : Response,
    next : NextFunction
) => {
    try{
        const data = await this.employeeService.createEmployeeAddress(request.params.id,request.body);
        response.send(
            this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
        );
    }catch(err){
        // console.log(err)
        next(err) ;
    }
}

  private getAllAddress = async (
            request: RequestWithUser,
            response: Response,
            next: NextFunction
          ) => {
            const data = await this.employeeService.getEmpAddr();
            response.send(
              this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
            );
        }

      //   private getByIdAddress = async (
      //     request: RequestWithUser,
      //     response: Response,
      //     next: NextFunction
      //   ) => {
      //     const data = await this.employeeService.getAllAddress();
      //     response.send(
      //       this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      //     );
      // }
}

export default EmployeeController;
