import { IsEnum } from 'class-validator';
import { Status } from '../enums/status.enum';

export class ChangeTransactionStatusDto {
  @IsEnum(Status, { message: 'Invalid status value' })
  status: Status;
}
