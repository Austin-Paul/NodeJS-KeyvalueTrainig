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
exports.AddressService = void 0;
const class_transformer_1 = require("class-transformer");
const Address_1 = require("../entities/Address");
const EntityNotFoundException_1 = __importDefault(require("../exception/EntityNotFoundException"));
const AddressRepository_1 = require("../repository/AddressRepository");
const errorCode_1 = require("../util/errorCode");
class AddressService {
    constructor() { this.addrRepository = new AddressRepository_1.AddressRepository(); }
    createAddress(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const addrData = (0, class_transformer_1.plainToClass)(Address_1.Address, {
                "address": body.address
            });
            const savedDetails = yield this.addrRepository.createAddress(addrData);
            return savedDetails;
        });
    }
    getAllAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.addrRepository.getAllAddress();
        });
    }
    getAddressByID(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.addrRepository.getAddressByID(id);
            if (!data) {
                throw new EntityNotFoundException_1.default(errorCode_1.ErrorCodes.USER_WITH_ID_NOT_FOUND);
            }
            return this.addrRepository.updateAddress(id, body);
        });
    }
}
exports.AddressService = AddressService;
//# sourceMappingURL=AddressService.js.map