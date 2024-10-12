import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyPaymentDto {
  @ApiProperty({example:'ab39b000-8751-11ef-b6ba-cffa029061d1'})
  @IsString()
  @IsNotEmpty()
  token: string;
}
