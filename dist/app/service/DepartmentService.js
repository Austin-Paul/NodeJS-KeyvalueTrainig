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
exports.DepartmentService = void 0;
const class_transformer_1 = require("class-transformer");
const Department_1 = require("../entities/Department");
const EntityNotFoundException_1 = __importDefault(require("../exception/EntityNotFoundException"));
const errorCode_1 = require("../util/errorCode");
class DepartmentService {
    constructor(departmentrepo) {
        this.departmentrepo = departmentrepo;
    }
    getAllDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentrepo.getAllDepartments();
        });
    }
    postDepartment(departmentDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newdepartment = (0, class_transformer_1.plainToClass)(Department_1.Department, {
                    name: departmentDetails.name,
                    isActive: true,
                });
                return this.departmentrepo.postDepartments(newdepartment);
            }
            catch (err) {
            }
        });
    }
    getByIdDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentrepo.getByIdDepartment(id);
            if (!department)
                throw new EntityNotFoundException_1.default(errorCode_1.ErrorCodes.USER_WITH_ID_NOT_FOUND);
            return department;
        });
    }
    putDepartment(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.departmentrepo.putDepartment(id, body);
        });
    }
    removeDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.departmentrepo.removeDepartment(id);
        });
    }
}
exports.DepartmentService = DepartmentService;
//# sourceMappingURL=DepartmentService.js.map