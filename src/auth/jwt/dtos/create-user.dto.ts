import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'rezabahmani.dev@gmail.com' })
  @IsEmail({}, { message: 'Please enter a valid email.' })
  email: string;

  @ApiProperty({ example: 'reza' })
  @MinLength(3, { message: 'name can not be less than 3 character' })
  @MaxLength(100, { message: 'name cannot be more than 100 characters' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '09123456789' })
  @IsPhoneNumber('IR', { message: 'Please enter a valid phone number.' })
  phone?: number;

  @ApiProperty({ example: 'Abc12345', minLength:8  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long.',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must include at least one uppercase letter.',
  })
  password: string;

  provider:any
}
