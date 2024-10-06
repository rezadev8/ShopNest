import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'rezabahmani.dev@gmail.com' })
  @IsEmail({}, { message: 'Please enter a valid email.' })
  email: string;

  @ApiProperty({ example: 'reza' })
  @IsOptional()
  @MinLength(3, { message: 'name can not be less than 3 character' })
  @MaxLength(100, { message: 'name cannot be more than 100 characters' })
  name: string;

  @ApiProperty({ example: '09123456789' })
  @IsPhoneNumber('IR', { message: 'Please enter a valid phone number.' })
  phone: number;

  @ApiProperty({ example: 'Abc12345', minLength: 8 })
  @IsStrongPassword(
    { minLength: 8 },
    { message: 'Password needs to be at least 8 characters, thanks! :)' },
  )
  password: string;
}
