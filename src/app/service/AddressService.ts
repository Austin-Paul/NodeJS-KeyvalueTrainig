import { plainToClass } from "class-transformer";
import { CreateAddressDto } from "../dto/CreateAddress";
import { Address } from "../entities/Address";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { AddressRepository } from "../repository/AddressRepository";
import { ErrorCodes } from "../util/errorCode";

export class AddressService{
    private addrRepository : AddressRepository
    constructor()
       { this.addrRepository = new AddressRepository();}
    

    public async createAddress(body: any){
        const addrData = plainToClass(Address, {
            "address" : body.address
        });
        const savedDetails = await this.addrRepository.createAddress(addrData);
        return savedDetails;
    }

    public async getAllAddress(){
        return this.addrRepository.getAllAddress();
    }

    async getAddressByID(id:string,body:CreateAddressDto){
        const data=await this.addrRepository.getAddressByID(id);
        if(!data)
        {
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND)
        }
        return this.addrRepository.updateAddress(id,body);
    }
}