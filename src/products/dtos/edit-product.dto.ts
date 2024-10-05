import { IsNotEmpty, IsOptional } from "class-validator";

export class EditProductDto{
    @IsOptional()
    @IsNotEmpty()
    name:string;

    @IsOptional()
    @IsNotEmpty()
    price:number;

    @IsOptional()
    @IsNotEmpty()
    description:string;

    @IsOptional()
    @IsNotEmpty()
    cover:string;
}