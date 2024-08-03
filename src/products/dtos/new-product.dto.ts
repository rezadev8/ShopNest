import { IsNotEmpty, IsNumber } from "class-validator";

export class NewProductDto{
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    price:number;

    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    cover:string;
}