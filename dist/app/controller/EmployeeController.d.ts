import { AbstractController } from "../util/rest/controller";
import { EmployeeService } from "../service/EmployeeService";
declare class EmployeeController extends AbstractController {
    private employeeService;
    constructor(employeeService: EmployeeService);
    protected initializeRoutes(): void;
    private getAllEmployee;
    private postEmployee;
    private getByIdEmployee;
    private putEmployee;
    private removeEmployee;
    private login;
    private createAddress;
    private getAllAddress;
}
export default EmployeeController;
