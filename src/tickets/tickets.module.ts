import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketService } from './tickets.service';
import { Ticket } from './entities/tickets.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { UserService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, User])],
  controllers: [TicketsController],
  providers: [TicketService , UserService],
})
export class TicketsModule {}
