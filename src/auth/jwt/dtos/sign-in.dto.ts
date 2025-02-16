import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'rezabahmani.dev@gmail.com | 09123456789' })
  @IsNotEmpty({message:"Please enter your email or phone number, buddy!"})
  username: string;

  @ApiProperty({ example: 'Abc12345'})
  @IsNotEmpty({message:"My friend, how am I supposed to log you in without a password? :/"})
  password: string;
}
