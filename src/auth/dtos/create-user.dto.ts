import { IsEmail, IsOptional, IsPhoneNumber, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please enter a valid email.' })
  email: string;

  @IsOptional()
  @MinLength(3 , {message:'Username can not be less than 3 character'})
  @MaxLength(100 , {message:'Username cannot be more than 10 characters'})
  username:string;

  @IsPhoneNumber('IR', { message: 'Please enter a valid phone number.' })
  phone: number;

  @IsStrongPassword(
    { minLength: 8 },
    { message: 'Password needs to be at least 8 characters, thanks! :)' },
  )
  password: string;
}
