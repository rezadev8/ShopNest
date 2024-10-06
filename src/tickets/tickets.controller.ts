import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { userInterface } from 'src/users/types/user';
import { TicketService } from './tickets.service';
import { SendMessagetDto } from './dtos/send-message.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { UpdateStatusDto } from './dtos/update-status.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(AuthGuard)
  @Get('')
  getUserTickets(@CurrentUser() user: userInterface) {
    return this.ticketService.getUserTickets(user.id);
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('/send-message')
  sendMessage(@Req() req, @Body() sendMessageDto: SendMessagetDto) {
    return this.ticketService.sendMessage(req.user?.id, sendMessageDto);
  }

  @UseGuards(AuthGuard)
  @Get('/:id/messages')
  getTicketMessages(@Param() { id }) {
    return this.ticketService.getTicketMessages(id);
  }

  @Roles(Role.ADNIM)
  @UseGuards(AuthGuard)
  @Delete(':id/ticket')
  deleteTicket(@Param() { id }) {
    return this.ticketService.deleteTicket(id);
  }

  @Roles(Role.ADNIM)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch('/:id/status')
  async updateTicketStatus(
    @Param('id') id: string,
    @Body() statusDto: UpdateStatusDto,
  ) {
    this.ticketService.updateStatus(id, statusDto.status);
  }
}
