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
exports.EmployeeService = void 0;
const class_transformer_1 = require("class-transformer");
const Employee_1 = require("../entities/Employee");
const EntityNotFoundException_1 = __importDefault(require("../exception/EntityNotFoundException"));
const errorCode_1 = require("../util/errorCode");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserNotAuthorizedException_1 = __importDefault(require("../exception/UserNotAuthorizedException"));
const IncorrectUsernameOrPasswordException_1 = __importDefault(require("../exception/IncorrectUsernameOrPasswordException"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AddressService_1 = require("./AddressService");
class EmployeeService {
    constructor(employeerepo) {
        this.employeerepo = employeerepo;
        this.addressService = new AddressService_1.AddressService();
        this.employeeLogin = (name, password) => __awaiter(this, void 0, void 0, function* () {
            const employeeDetails = yield this.employeerepo.getEmployeeByName(name);
            if (!employeeDetails) {
                throw new UserNotAuthorizedException_1.default();
            }
            const validPassword = yield bcrypt_1.default.compare(password, employeeDetails.password);
            if (validPassword) {
                let payload = {
                    "custom:id": employeeDetails.id,
                    "custom:name": employeeDetails.name,
                    "role": employeeDetails.role,
                };
                const token = this.generateAuthTokens(payload);
                return {
                    idToken: token,
                    employeeDetails,
                };
            }
            else {
                throw new IncorrectUsernameOrPasswordException_1.default();
            }
        });
        this.generateAuthTokens = (payload) => {
            return jsonwebtoken_1.default.sign(payload, process.env.JWT_TOKEN_SECRET, {
                expiresIn: process.env.ID_TOKEN_VALIDITY,
            });
        };
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeerepo.getAllEmployees();
            if (!employee)
                throw new EntityNotFoundException_1.default(errorCode_1.ErrorCodes.USER_WITH_ID_NOT_FOUND);
            return employee;
        });
    }
    createEmployee(employeeDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(employeeDetails);
            try {
                const newEmployee = (0, class_transformer_1.plainToClass)(Employee_1.Employee, {
                    name: employeeDetails.name,
                    password: employeeDetails.password ? yield bcrypt_1.default.hash(employeeDetails.password, 10) : '',
                    departmentId: employeeDetails.departmentId,
                    role: employeeDetails.role,
                    isActive: true,
                });
                console.log(newEmployee);
                const save = yield this.employeerepo.saveEmployeeDetails(newEmployee);
                return save;
            }
            catch (err) {
            }
        });
    }
    getByIdEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeerepo.getByIdEmployee(id);
            if (!employee)
                throw new EntityNotFoundException_1.default(errorCode_1.ErrorCodes.USER_WITH_ID_NOT_FOUND);
            return employee;
        });
    }
    putEmployee(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.employeerepo.putEmployee(id, body);
        });
    }
    removeEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.employeerepo.removeEmployee(id);
        });
    }
    getEmpAddr() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.addressService.getAllAddress();
        });
    }
    createEmployeeAddress(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.employeerepo.getByIdEmployee(id);
            if (!data)
                throw new EntityNotFoundException_1.default(errorCode_1.ErrorCodes.USER_WITH_ID_NOT_FOUND);
            return this.addressService.createAddress(body);
        });
    }
}
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=EmployeeService.js.map