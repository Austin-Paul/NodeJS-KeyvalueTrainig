"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../util/rest/controller");
const constants_1 = __importDefault(require("../constants"));
const authorizationMiddleware_1 = __importDefault(require("../middleware/authorizationMiddleware"));
const validationMiddleware_1 = __importDefault(require("../middleware/validationMiddleware"));
const CreateDepartment_1 = require("../dto/CreateDepartment");
const roles_1 = require("../constants/roles");
class DepartmentController extends controller_1.AbstractController {
    constructor(departmentService) {
        super(`${constants_1.default.apiPrefix}/department`);
        this.departmentService = departmentService;
        this.getAllDepartment = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = { message: "Get" };
                response.status(200);
                response.send(yield this.departmentService.getAllDepartments());
            }
            catch (error) {
                return next(error);
            }
        });
        this.postDepartment = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = { message: "post" };
                response.status(200);
                response.send(this.departmentService.postDepartment(request.body));
            }
            catch (error) {
                return next(error);
            }
        });
        this.getByIdDepartment = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = { message: "post" };
                response.status(200);
                response.send(this.fmt.formatResponse(yield this.departmentService.getByIdDepartment(request.params.id), Date.now() - request.startTime, "OK"));
            }
            catch (error) {
                return next(error);
            }
        });
        this.putDepartment = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = { message: "post" };
                response.status(200);
                response.send(this.fmt.formatResponse(yield this.departmentService.putDepartment(request.params.id, request.body), Date.now() - request.startTime, "OK"));
            }
            catch (error) {
                return next(error);
            }
        });
        this.removeDepartment = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = { message: "post" };
                response.status(200);
                response.send(yield this.departmentService.removeDepartment(request.params.id));
            }
            catch (error) {
                return next(error);
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, (0, authorizationMiddleware_1.default)([roles_1.roles.admin, roles_1.roles.hr, roles_1.roles.manager, roles_1.roles.engineer]), this.getAllDepartment);
        this.router.post(`${this.path}`, this.postDepartment);
        this.router.put(`${this.path}/:id`, (0, validationMiddleware_1.default)(CreateDepartment_1.CreateDepartmentDto, 'body'), this.putDepartment);
        this.router.get(`${this.path}/:id`, (0, validationMiddleware_1.default)(CreateDepartment_1.CreateDepartmentDto, 'body'), this.getByIdDepartment);
        this.router.delete(`${this.path}/:id`, (0, validationMiddleware_1.default)(CreateDepartment_1.CreateDepartmentDto, 'body'), this.removeDepartment);
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=DepartmentController.js.map