import {
  IsNotEmpty,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty({message:"ایمیل و یا شماره تماست رو وارد کن عزیز."})
  username: string;
  @IsNotEmpty({message:"دوست من رمز عبور رو ندی من چطور لاگینت کنم :/"})
  password: string;
}
