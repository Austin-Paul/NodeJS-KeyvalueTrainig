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
exports.AddressRepository = void 0;
const typeorm_1 = require("typeorm");
const Address_1 = require("../entities/Address");
class AddressRepository {
    createAddress(addrDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const addrConnection = (0, typeorm_1.getConnection)().getRepository(Address_1.Address);
            const saveDetails = yield addrConnection.save(addrDetails);
            return saveDetails;
        });
    }
    getAllAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const addrConnection = (0, typeorm_1.getConnection)().getRepository(Address_1.Address);
            return addrConnection.findAndCount();
        });
    }
    getAddressByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const addrRepo = (0, typeorm_1.getConnection)().getRepository(Address_1.Address);
            return addrRepo.findOne({ where: { id: id }, });
        });
    }
    updateAddress(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const addrRepo = (0, typeorm_1.getConnection)().getRepository(Address_1.Address);
            return addrRepo.update(id, body);
        });
    }
}
exports.AddressRepository = AddressRepository;
//# sourceMappingURL=AddressRepository.js.map