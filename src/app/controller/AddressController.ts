// import { AbstractController } from "../util/rest/controller";
// import APP_CONSTANTS from "../constants";
// import { Request, Response, NextFunction } from "express";
// import RequestWithUser from "../util/rest/request";
// import validationMiddleware from "../middleware/validationMiddleware";

// import { CreateEmployeeDto } from "../dto/CreateEmployee";
// import HttpException from "../exception/HttpException";
// import { AddressService } from "../service/AddressService";


// class AddressController extends AbstractController{
//     constructor(
//         private addressService: AddressService
//     ) {
//         super(`${APP_CONSTANTS.apiPrefix}/address`);
//         this.initializeRoutes();
//     }

//     protected initializeRoutes(): void {
//         this.router.post(
//             `${this.path}`,
//             this.createAddress
//         )

//         this.router.get(
//             `${this.path}`,
//             this.getAllAddress
//         )
        
//     }

//     private createAddress = async (
//         request : RequestWithUser,
//         response : Response,
//         next : NextFunction
//     ) => {
//         try{
//             const data = await this.addressService.createAddress(request.body);
//             response.send(
//                 this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
//             );
//         }catch(err){
//             // console.log(err)
//             next(err) ;
//         }
//     }

//     private getAllAddress = async (
//         request: RequestWithUser,
//         response: Response,
//         next: NextFunction
//       ) => {
//         const data = await this.addressService.getAllAddress();
//         response.send(
//           this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
//         );
//     }

// }

// export default AddressController