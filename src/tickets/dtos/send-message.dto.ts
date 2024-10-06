import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class SendMessagetDto {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3, { message: 'Title can not be less than 3 character' })
  title: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Message can not be less than 3 character' })
  message: string;

  @IsOptional()
  @IsNotEmpty()
  chatId: string;
}
