import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/tickets.entity';
import { Equal, IsNull, Not, Repository } from 'typeorm';
import { SendMessageDto } from './dtos/send-message.dto';
import { UserService } from 'src/users/users.service';
import { v1 as uuidv4 } from 'uuid';
import { Status } from './enums/status.enum';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
    private readonly usersService: UserService,
  ) {}

  async findChat(chatId: string , userId?:number) {
    try {
      const chat = this.ticketRepository.find({
        where: { chatId , user:{id:userId} },
        relations: { user: true },
        select: { user: { role: true } },
      });

      return chat;
    } catch (error) {
      throw new InternalServerErrorException(
        'Uh-oh! We hit a snag on sending your message!',
      );
    }
  }

  async getUserTickets(userId: number) {
    try {
      const tickets = await this.ticketRepository.find({
        where: { user: { id: Equal(userId) }, title: Not(IsNull()) },
      });

      return tickets;
    } catch (error) {
      throw new InternalServerErrorException(
        'Uh-oh! We hit a snag on getting tickets!',
      );
    }
  }

  async sendMessage(userId: number, sendMessageDto: SendMessageDto) {
    try {
      const user = await this.usersService.findOne(userId);
      let chatId = sendMessageDto.chatId;
      if (!chatId && !sendMessageDto.title)
        throw new BadRequestException('Title is required');

      if (chatId) {
        const findChat = await this.findChat(chatId);

        if (findChat.length < 1)
          throw new NotFoundException('Ticket not found!');
      } else chatId = uuidv4();

      const isParentMessage = sendMessageDto.title && !sendMessageDto.chatId;

      await this.ticketRepository.save({
        user,
        chatId,
        text: sendMessageDto.message,
        title:
        isParentMessage
            ? sendMessageDto.title
            : null,
        status: isParentMessage ? Status.OPEN : null,
      });

      return {
        message: 'Message sended successfully!',
        ticket: { chatId, user: { role: user.role } },
      };
    } catch (error) {
      if (!error.response)
        throw new InternalServerErrorException(
          'Uh-oh! We hit a snag on sending your message!',
        );
      throw error;
    }
  }

  async getTicketMessages(chatId: string , userId:number) {
    try {
      const getChatMessages = await this.findChat(chatId , userId);

      if (getChatMessages.length < 1)
        throw new NotFoundException('Ticket not found!');

      return getChatMessages;
    } catch (error) {
      if (!error.response)
        throw new InternalServerErrorException(
          'Uh-oh! We hit a snag on getting your messages!',
        );
      throw error;
    }
  }

  async deleteTicket(chatId: string) {
    try {
      const tickets = await this.ticketRepository.find({ where: { chatId } });

      if (tickets.length < 1) throw new NotFoundException('Ticket not found!');

      await this.ticketRepository.remove(tickets);

      return { message: 'Ticket deleted successfully', ticket: { chatId } };
    } catch (error) {
      console.log(error);
      if (!error.response)
        throw new InternalServerErrorException(
          'Uh-oh! We hit a snag on deleting ticket!',
        );
      throw error;
    }
  }

  async updateStatus(chatId: string, status: Status) {
    try {
      const ticket = await this.ticketRepository.findOne({
        where: { chatId, title: Not(IsNull()) },
      });

      if (!ticket) throw new NotFoundException('Ticket not found!');
      ticket.status = status;
      await this.ticketRepository.save(ticket);

      return {
        message: 'Ticket status changed successfully',
        ticket: { id: ticket.id, status },
      };
    } catch (error) {
      if (!error.response)
        throw new InternalServerErrorException(
          'Uh-oh! We hit a snag on changing ticket status!',
        );
        throw error
    }
  }
}
