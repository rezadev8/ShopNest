import { IsEmail, IsPhoneNumber, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail({} , {message:"لطفا یک ایمیل معتبر وارد کن."})
  email: string;
  @IsPhoneNumber('IR' , {message:"لطفا یک شماره موبایل معتبر وارد کن."})
  phone: number;
  @IsStrongPassword({minLength:8} , {message:"رمز عبورت رو حداقل 8 کاراکتر وارد کنی ممنونت میشم :)"})
  password:string;
}
