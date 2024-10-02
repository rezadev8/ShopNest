import {
  IsNotEmpty,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty({message:"Please enter your email or phone number, buddy!"})
  username: string;
  @IsNotEmpty({message:"My friend, how am I supposed to log you in without a password? :/"})
  password: string;
}
