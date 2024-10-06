import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/tickets.entitie';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
  ) {}

  async getUserTickets(userId:number) {
    try {
        const tickets = await this.ticketRepository.find({where:{user:{id:userId}}});

        return tickets
    } catch (error) {
        throw new InternalServerErrorException('Uh-oh! We hit a snag on getting tickets!')
    }
  }
}
