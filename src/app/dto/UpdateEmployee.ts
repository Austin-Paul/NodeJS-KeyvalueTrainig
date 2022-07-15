import {  IsString } from "class-validator";

export class UpdateEmployeeDto {
    @IsString()//Decorator
    public name: string;
    @IsString()
    public departmentId: string;

    @IsString()
    public password: string;

    @IsString()
    public role: string;
    
    
}