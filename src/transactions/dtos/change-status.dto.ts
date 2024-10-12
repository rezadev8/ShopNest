import { IsEnum } from 'class-validator';
import { Status } from '../enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeTransactionStatusDto {
  @ApiProperty({type:'enum' , enum:Status , example:'canceled' ,})
  @IsEnum(Status, { message: 'Invalid status value' })
  status: Status;
}
