import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/tickets.entitie';
import { IsNull, Not, Repository } from 'typeorm';
import { SendMessagetDto } from './dtos/send-message.dto';
import { UserService } from 'src/users/users.service';
import { v1 as uuidv4 } from 'uuid';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
    private readonly usersService: UserService,
  ) {}

  async findChat(chatId: string) {
    try {
      const chat = this.ticketRepository.find({ where: { chatId } });
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
        where: { user: { id: userId }, title: Not(IsNull()) },
        relations: { user: true },
        select: { user: { role: true } },
      });

      return tickets;
    } catch (error) {
      throw new InternalServerErrorException(
        'Uh-oh! We hit a snag on getting tickets!',
      );
    }
  }

  async sendMessage(userId: number, sendMessageDto: SendMessagetDto) {
    try {
      const user = await this.usersService.findOne(userId);
      let chatId = sendMessageDto.chatId;

      if (chatId) {
        const findChat = await this.findChat(chatId);

        if (findChat.length < 1) throw new NotFoundException('Chat not found!');
      } else chatId = uuidv4();

      await this.ticketRepository.save({
        user,
        chatId,
        text: sendMessageDto.message,
        title:
          sendMessageDto.title && !sendMessageDto.chatId
            ? sendMessageDto.title
            : null,
      });

      return { message: 'Message sended successfuly!', ticket: { chatId , user:{role:user.role} } };
    } catch (error) {
      if (!error.response)
        throw new InternalServerErrorException(
          'Uh-oh! We hit a snag on sending your message!',
        );
      throw error;
    }
  }
}
