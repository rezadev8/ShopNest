import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { userInterface } from 'src/users/types/user';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}


  @UseGuards(AuthGuard)
  getUserTickets(@CurrentUser() user:userInterface) {
    return this.ticketsService.getUserTickets(user.id)
  }
}
