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
import {
  DeleteTicketSwagger,
  GetTicketMessages,
  GetUserTicketsSwagger,
  SendMessageSwagger,
  UpdateTicketStatusSwagger,
} from './decorators/tickets.swagger.decorator';
import { UnauthorizedSwagger } from 'src/common/decorators/global.swagger.decorator';

@UnauthorizedSwagger()
@ApiTags('Tickets')
@UseGuards(AuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketService) {}

  @GetUserTicketsSwagger()
  @Get('')
  getUserTickets(@CurrentUser() user: userInterface) {
    return this.ticketService.getUserTickets(user.id);
  }

  @SendMessageSwagger()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('/send-message')
  sendMessage(@Req() req, @Body() sendMessageDto: SendMessagetDto) {
    return this.ticketService.sendMessage(req.user?.id, sendMessageDto);
  }

  @GetTicketMessages()
  @Get('/:id/messages')
  getTicketMessages(@Req() req, @Param() { id }) {
    return this.ticketService.getTicketMessages(id, req.user?.id);
  }

  @DeleteTicketSwagger()
  @Roles(Role.ADNIM)
  @Delete(':id/ticket')
  deleteTicket(@Param() { id }) {
    return this.ticketService.deleteTicket(id);
  }

  @UpdateTicketStatusSwagger()
  @Roles(Role.ADNIM)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch('/:id/status')
  async updateTicketStatus(
    @Param('id') id: string,
    @Body() statusDto: UpdateStatusDto,
  ) {
    return this.ticketService.updateStatus(id, statusDto.status);
  }
}
