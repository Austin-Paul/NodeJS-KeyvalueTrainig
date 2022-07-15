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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRespository = void 0;
const typeorm_1 = require("typeorm");
const Employee_1 = require("../entities/Employee");
class EmployeeRespository {
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepo = (0, typeorm_1.getConnection)().getRepository(Employee_1.Employee);
            return employeeRepo.find({ relations: ['department', 'address'] });
        });
    }
    putEmployee(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepo = (0, typeorm_1.getConnection)().getRepository(Employee_1.Employee);
            return yield employeeRepo.update(id, body);
        });
    }
    getByIdEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepo = (0, typeorm_1.getConnection)().getRepository(Employee_1.Employee);
            return yield employeeRepo.findOne(id);
        });
    }
    saveEmployeeDetails(employeeDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepo = (0, typeorm_1.getConnection)().getRepository(Employee_1.Employee);
            return employeeRepo.save(employeeDetails);
        });
    }
    getEmployeeByName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepo = (0, typeorm_1.getConnection)().getRepository(Employee_1.Employee);
            const employeeDetail = yield employeeRepo.findOne({
                where: { name: username },
            });
            return employeeDetail;
        });
    }
    removeEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepo = (0, typeorm_1.getConnection)().getRepository(Employee_1.Employee);
            return yield employeeRepo.softDelete(id);
        });
    }
}
exports.EmployeeRespository = EmployeeRespository;
//# sourceMappingURL=EmployeeRepository.js.map