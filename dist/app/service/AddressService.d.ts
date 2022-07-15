import { CreateAddressDto } from "../dto/CreateAddress";
import { Address } from "../entities/Address";
export declare class AddressService {
    private addrRepository;
    constructor();
    createAddress(body: any): Promise<Address>;
    getAllAddress(): Promise<[Address[], number]>;
    getAddressByID(id: string, body: CreateAddressDto): Promise<import("typeorm").UpdateResult>;
}
