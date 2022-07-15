import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import authorize from "../middleware/authorizationMiddleware";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateDepartmentDto } from "../dto/CreateDepartment";
import { roles } from "../constants/roles";

class DepartmentController extends AbstractController {
  constructor(private departmentService:DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, 
    authorize([roles.admin,roles.hr,roles.manager,roles.engineer]),
    this.getAllDepartment);


     this.router.post(`${this.path}`, this.postDepartment);
     
     this.router.put(`${this.path}/:id`,
     //authorize([roles.admin,roles.hr]),
     validationMiddleware(CreateDepartmentDto, 'body'), 
     this.putDepartment);

     this.router.get(`${this.path}/:id`, 
     //authorize([roles.admin,roles.hr]),
      validationMiddleware(CreateDepartmentDto, 'body'),
     this.getByIdDepartment);

     this.router.delete(`${this.path}/:id`,
     //authorize([roles.admin,roles.hr]),
     validationMiddleware(CreateDepartmentDto, 'body'), 
     this.removeDepartment);
  }




  private getAllDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Get"};
      response.status(200);
      response.send(await this.departmentService.getAllDepartments());
    } catch (error) {
      return next(error);
    }
  }

  private postDepartment= async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "post"};
      response.status(200);
      response.send(this.departmentService.postDepartment(request.body));
    } catch (error) {
      return next(error);
    }
  }

  private getByIdDepartment= async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "post"};
      response.status(200);
      //response.send(this.departmentService.getByIddepartment(request.params.id));
      response.send(this.fmt.formatResponse(await this.departmentService.getByIdDepartment(request.params.id), Date.now() - request.startTime, "OK" ))
    } catch (error) {
     return next(error);
     }  
  }

  private putDepartment= async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "post"};
      response.status(200);
      //response.send(this.DepartmentService.getByIdDepartment(request.params.id));
      response.send(this.fmt.formatResponse(await this.departmentService.putDepartment(request.params.id,request.body), Date.now() - request.startTime, "OK" ))
    } catch (error) {
     return next(error);
     }  
  }
  private removeDepartment= async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "post"};
      response.status(200);
      
      response.send(await this.departmentService.removeDepartment(request.params.id));
    } catch (error) {
     return next(error);
     }  
  }
}


export default DepartmentController;
