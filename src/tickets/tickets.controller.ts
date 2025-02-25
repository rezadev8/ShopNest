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
import { JwtAuthGuard } from 'src/auth/jwt/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { userInterface } from 'src/users/types/user';
import { TicketService } from './tickets.service';
import { SendMessageDto } from './dtos/send-message.dto';
import { Roles } from 'src/auth/jwt/decorators/roles.decorator';
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
import { Throttle } from '@nestjs/throttler';

@Throttle({default:{ttl:120000 , limit:20}})
@UnauthorizedSwagger()
@ApiTags('Tickets')
@UseGuards(JwtAuthGuard)
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
  sendMessage(@Req() req, @Body() sendMessageDto: SendMessageDto) {
    return this.ticketService.sendMessage(req.user?.id, sendMessageDto);
  }

  @GetTicketMessages()
  @Get('/:id/messages')
  getTicketMessages(@Req() req, @Param() { id }) {
    return this.ticketService.getTicketMessages(id, req.user?.id);
  }

  @DeleteTicketSwagger()
  @Roles(Role.ADMIN)
  @Delete(':id/ticket')
  deleteTicket(@Param() { id }) {
    return this.ticketService.deleteTicket(id);
  }

  @UpdateTicketStatusSwagger()
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch('/:id/status')
  async updateTicketStatus(
    @Param('id') id: string,
    @Body() statusDto: UpdateStatusDto,
  ) {
    return this.ticketService.updateStatus(id, statusDto.status);
  }
}
