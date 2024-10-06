import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from '../enums/status.enum';

export class UpdateStatusDto {
  @IsEnum(Status, { message: 'Invalid status value' })
  status: Status;
}
