import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/tickets.entitie';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { UserService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, User])],
  controllers: [TicketsController],
  providers: [TicketsService , UserService],
})
export class TicketsModule {}
