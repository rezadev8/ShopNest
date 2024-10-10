import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyPaymentDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
