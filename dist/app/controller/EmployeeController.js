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
const validationMiddleware_1 = __importDefault(require("../middleware/validationMiddleware"));
const CreateEmployee_1 = require("../dto/CreateEmployee");
const authorizationMiddleware_1 = __importDefault(require("../middleware/authorizationMiddleware"));
const UpdateEmployee_1 = require("../dto/UpdateEmployee");
const roles_1 = require("../constants/roles");
const CreateAddress_1 = require("../dto/CreateAddress");
class EmployeeController extends controller_1.AbstractController {
    constructor(employeeService) {
        super(`${constants_1.default.apiPrefix}/employee`);
        this.employeeService = employeeService;
        this.getAllEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = { message: "Get" };
                response.status(200);
                response.send(yield this.employeeService.getAllEmployees());
            }
            catch (error) {
                return next(error);
            }
        });
        this.postEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = { message: "post" };
                response.status(200);
                response.send(this.employeeService.createEmployee(request.body));
            }
            catch (error) {
                return next(error);
            }
        });
        this.getByIdEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = { message: "post" };
                response.status(200);
                response.send(this.fmt.formatResponse(yield this.employeeService.getByIdEmployee(request.params.id), Date.now() - request.startTime, "OK"));
            }
            catch (error) {
                return next(error);
            }
        });
        this.putEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = { message: "post" };
                response.status(200);
                response.send(this.fmt.formatResponse(yield this.employeeService.putEmployee(request.params.id, request.body), Date.now() - request.startTime, "OK"));
            }
            catch (error) {
                return next(error);
            }
        });
        this.removeEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = { message: "post" };
                response.status(200);
                response.send(yield this.employeeService.removeEmployee(request.params.id));
            }
            catch (error) {
                return next(error);
            }
        });
        this.login = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const loginData = request.body;
            const loginDetail = yield this.employeeService.employeeLogin(loginData.name, loginData.password);
            response.send(this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK"));
        });
        this.createAddress = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.employeeService.createEmployeeAddress(request.params.id, request.body);
                response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
            }
            catch (err) {
                next(err);
            }
        });
        this.getAllAddress = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.employeeService.getEmpAddr();
            response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, (0, authorizationMiddleware_1.default)([roles_1.roles.admin, roles_1.roles.hr, roles_1.roles.manager, roles_1.roles.manager]), (0, validationMiddleware_1.default)(CreateEmployee_1.CreateEmployeeDto, 'body'), this.getAllEmployee);
        this.router.post(`${this.path}`, (0, authorizationMiddleware_1.default)([roles_1.roles.admin, roles_1.roles.hr]), (0, validationMiddleware_1.default)(CreateEmployee_1.CreateEmployeeDto, 'body'), this.postEmployee);
        this.router.get(`${this.path}/:id`, (0, authorizationMiddleware_1.default)([roles_1.roles.admin, roles_1.roles.hr]), (0, validationMiddleware_1.default)(CreateEmployee_1.CreateEmployeeDto, 'body'), this.getByIdEmployee);
        this.router.put(`${this.path}/:id`, (0, authorizationMiddleware_1.default)([roles_1.roles.admin, roles_1.roles.hr]), (0, validationMiddleware_1.default)(UpdateEmployee_1.UpdateEmployeeDto, 'body'), this.putEmployee);
        this.router.delete(`${this.path}/:id`, (0, authorizationMiddleware_1.default)([roles_1.roles.admin, roles_1.roles.hr]), (0, validationMiddleware_1.default)(UpdateEmployee_1.UpdateEmployeeDto, 'body'), this.removeEmployee);
        this.router.post(`${this.path}/login`, this.login);
        this.router.get(`${this.path}/address`, (0, authorizationMiddleware_1.default)([roles_1.roles.admin, roles_1.roles.hr, roles_1.roles.manager, roles_1.roles.manager]), (0, validationMiddleware_1.default)(CreateAddress_1.CreateAddressDto, 'body'), this.getAllAddress);
        this.router.get(`${this.path}/:id/address`, (0, authorizationMiddleware_1.default)([roles_1.roles.admin, roles_1.roles.hr]), (0, validationMiddleware_1.default)(CreateAddress_1.CreateAddressDto, 'body'), this.getByIdEmployee);
        this.router.post(`${this.path}/address`, (0, authorizationMiddleware_1.default)([roles_1.roles.admin, roles_1.roles.hr]), (0, validationMiddleware_1.default)(CreateAddress_1.CreateAddressDto, 'body'), this.createAddress);
        this.router.get(`${this.path}/:id/address`, (0, authorizationMiddleware_1.default)([roles_1.roles.admin, roles_1.roles.hr]), (0, validationMiddleware_1.default)(CreateAddress_1.CreateAddressDto, 'body'), this.getByIdEmployee);
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=EmployeeController.js.map