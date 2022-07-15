import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateIf, ValidateNested } from "class-validator";
export class CreateAddressDto {
    @IsString()//Decorator
    public address:string;
    
}