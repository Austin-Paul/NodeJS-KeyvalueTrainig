import { AbstractController } from "../util/rest/controller";
import { DepartmentService } from "../service/DepartmentService";
declare class DepartmentController extends AbstractController {
    private departmentService;
    constructor(departmentService: DepartmentService);
    protected initializeRoutes(): void;
    private getAllDepartment;
    private postDepartment;
    private getByIdDepartment;
    private putDepartment;
    private removeDepartment;
}
export default DepartmentController;
