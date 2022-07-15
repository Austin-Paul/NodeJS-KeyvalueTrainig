import { getConnection, Repository } from "typeorm";
import { CreateAddressDto } from "../dto/CreateAddress";
import { Address } from "../entities/Address";

export class AddressRepository {
    public async createAddress( addrDetails : Address ){
        const addrConnection = getConnection().getRepository(Address);
        const saveDetails = await addrConnection.save(addrDetails);
        return saveDetails;
    }

    public async getAllAddress(){
        const addrConnection = getConnection().getRepository(Address);
        return addrConnection.findAndCount();
    }

    async getAddressByID(id:string){
        const addrRepo=getConnection().getRepository(Address);
        return addrRepo.findOne({where:{id:id},});
    }

    async updateAddress(id:string,body:CreateAddressDto){
        const addrRepo=getConnection().getRepository(Address);
        return addrRepo.update(id,body);
    }
}