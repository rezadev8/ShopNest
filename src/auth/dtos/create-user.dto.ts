import { IsEmail, IsPhoneNumber, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail({} , {message:"Please enter a valid email."})
  email: string;
  @IsPhoneNumber('IR' , {message:"Please enter a valid phone number."})
  phone: number;
  @IsStrongPassword({minLength:8} , {message:"Password needs to be at least 8 characters, thanks! :)"})
  password:string;
}
