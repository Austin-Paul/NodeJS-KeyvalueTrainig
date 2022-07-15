import { IsNumber, IsString } from "class-validator";

export class CreateDepartmentDto {
    @IsString()//Decorator
    public name: string;

   
    
}