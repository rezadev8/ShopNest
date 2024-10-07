import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from '../enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
  @ApiProperty({type:'enum' , enum:Status})
  @IsEnum(Status, { message: 'Invalid status value' })
  status: Status;
}
