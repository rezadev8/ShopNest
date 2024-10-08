import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import {
  InternalServerErrorSwagger,
  NotFoundErrorSwagger,
} from 'src/common/decorators/global.swagger.decorator';

const ticketExample = {
  id: 1,
  title: 'Hello world',
  text: 'Ok man',
  chatId: '180aee90-83df-11ef-abc7-dda598c33e90',
  status: 'open',
  createdAt: '2024-10-06T12:32:47.612Z',
  updatedAt: '2024-10-06T13:20:05.345Z',
};

const NotFoundTicketSwagger = () => NotFoundErrorSwagger('Ticket not found!');

export const GetUserTicketsSwagger = () => {
  return applyDecorators(
    ApiResponse({ example: [ticketExample], status: 200 }),
    InternalServerErrorSwagger({
      description: 'Server error in receiving user tickets',
      message: 'Uh-oh! We hit a snag on getting tickets!',
    }),
  );
};

export const SendMessageSwagger = () => {
  return applyDecorators(
    ApiResponse({
      status: 201,
      example: {
        message: 'Message sended successfuly!',
        ticket: {
          chatId: '3eb15bd0-84e6-11ef-a67a-35b458e2a6ce',
          user: {
            role: 'user',
          },
        },
      },
      description: 'The message is sent successfully.',
    }),
    NotFoundErrorSwagger('Ticket not found!'),
    ApiBadRequestResponse({
      example: {
        message: 'Title is required',
        error: 'Bad Request',
        statusCode: 400,
      },
      description: 'Occurs when neither title nor chatId is sent. ',
    }),
    InternalServerErrorSwagger({
      description:
        'Server error in creating a ticket or sending a message in a ticket',
      message: 'Uh-oh! We hit a snag on sending your message!',
    }),
  );
};

export const GetTicketMessages = () => {
  return applyDecorators(
    ApiParam({ name: 'id', description: 'Ticket chatID' }),
    ApiResponse({
      status: 200,
      example: [
        {
          ...ticketExample,
          user: {
            role: 'user',
          },
        },
      ],
    }),
    NotFoundTicketSwagger(),
    InternalServerErrorSwagger({
      description: 'Server error in getting a messages in a ticket',
      message: 'Uh-oh! We hit a snag on getting your messages!',
    }),
  );
};

export const DeleteTicketSwagger = () => {
  return applyDecorators(
    ApiParam({ name: 'id', description: 'Ticket chatID' }),
    ApiResponse({
      example: {
        message: 'Ticket deleted succssfuly',
        ticket: {
          chatId: '180aee90-83df-11ef-abc7-dda598c33e90',
        },
      },
      description:
        'The ticket along with all the messages related to it have been deleted successfully',
      status: 200,
    }),
    NotFoundTicketSwagger(),
    InternalServerErrorSwagger({
      description: 'Server error in deleting a ticket',
      message: 'Uh-oh! We hit a snag on deleting ticket!',
    }),
  );
};

export const UpdateTicketStatusSwagger = () => {
  return applyDecorators(
    ApiParam({
      name: 'id',
      description: 'Ticket chatId to change ticket status',
    }),
    ApiResponse({
      example: {
        message: 'Ticket status changed successfuly',
        ticket: {
          id: 1,
          status: 'open',
        },
      },
      description: 'The ticket status has been changed successfully',
      status:200
    }),
    NotFoundTicketSwagger(),
    InternalServerErrorSwagger({
      description: 'Server error in chanhong ticket status',
      message: 'Uh-oh! We hit a snag on changing ticket status!',
    }),
  );
};
