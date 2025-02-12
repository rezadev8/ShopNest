import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({
    example: 'Ticket title',
    required: false,
    description:
      'If the ticket has a title and the chatId is equal to null, it will be registered as a ticket. Otherwise, it will be attached to the ticket that has chatId as a message.',
  })
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3, { message: 'Title can not be less than 3 character' })
  title: string;

  @ApiProperty({
    example: 'Ticket content',
    description: 'Ticket content',
  })
  @IsNotEmpty()
  @MinLength(3, { message: 'Message can not be less than 3 character' })
  message: string;

  @ApiProperty({ example: 'Ticket chat id', required: false , description:'Which ticket do you want to connect to as a continuation of the message? Write the chatId of that ticket here.' })
  @IsOptional()
  @IsNotEmpty()
  chatId: string;
}
