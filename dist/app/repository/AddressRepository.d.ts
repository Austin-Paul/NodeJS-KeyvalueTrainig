import { CreateAddressDto } from "../dto/CreateAddress";
import { Address } from "../entities/Address";
export declare class AddressRepository {
    createAddress(addrDetails: Address): Promise<Address>;
    getAllAddress(): Promise<[Address[], number]>;
    getAddressByID(id: string): Promise<Address>;
    updateAddress(id: string, body: CreateAddressDto): Promise<import("typeorm").UpdateResult>;
}
