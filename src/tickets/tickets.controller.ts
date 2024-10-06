import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { userInterface } from 'src/users/types/user';
import { TicketsService } from './tickets.service';
import { SendMessagetDto } from './dtos/send-message.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(AuthGuard)
  @Get('')
  getUserTickets(@CurrentUser() user: userInterface) {
    return this.ticketsService.getUserTickets(user.id);
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('/send-message')
  sendMessage(@Req() req, @Body() sendMessageDto: SendMessagetDto) {
    return this.ticketsService.sendMessage(req.user?.id, sendMessageDto);
  }
}