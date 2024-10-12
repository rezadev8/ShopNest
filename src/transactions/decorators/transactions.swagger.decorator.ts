import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiParam,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { productExample } from 'src/common/data/api.swagger';
import {
  InternalServerErrorSwagger,
  NotFoundErrorSwagger,
  UnauthorizedSwagger,
} from 'src/common/decorators/global.swagger.decorator';

const transactionExample = {
  id: 75,
  token: '72280940-874e-11ef-8042-d36c0929a540',
  amount: 20,
  status: 'canceled',
  createdAt: '2024-10-10T21:27:26.423Z',
  updatedAt: '2024-10-10T21:27:37.000Z',
};

export const ChangeTransactionStatusSwagger = () => {
  return applyDecorators(
    UnauthorizedSwagger(),
    ApiParam({
      name: 'id',
      example: 1,
    }),
    InternalServerErrorSwagger({
      message: 'Oops! Server error while changing transaction status!',
      description: 'Server error when changing transaction status',
    }),
    ApiOkResponse({
      example: {
        message: 'Ticket status changed successfuly',
        ticket: {
          id: 1,
          status: 'closed',
        },
      },
    }),
  );
};

export const GetTransactionsSwagger = () => {
  return applyDecorators(
    UnauthorizedSwagger(),
    ApiOkResponse({
      example: { transactions: [transactionExample], total: 5 },
    }),
    InternalServerErrorSwagger({
      message: 'Oops! There was an issue with the get transactions',
      description: 'Error while receiving transactions',
    }),
  );
};

export const GetUserTransactionsSwagger = () => {
  return applyDecorators(
    UnauthorizedSwagger(),
    InternalServerErrorSwagger({
      message: 'Oops! Server error while getting user transactions',
      description: 'Error while receiving transactions',
    }),
    ApiOkResponse({ example: [transactionExample] }),
  );
};

export const BuyProductsSwagger = () => {
  return applyDecorators(
    UnauthorizedSwagger(),
    ApiCreatedResponse({
      example: {
        productsRemoved: [productExample],
        transaction: { ...transactionExample, status: 'pending' },
      },
      description:
        "productsRemoved are products that have been selected more than the inventory and were automatically removed from the user's shopping cart.",
    }),
    ApiBadRequestResponse({
      example: {
        statusCode: 400,
        message: 'Your basket is empty. You cannot proceed to checkout',
      },
      description:
        "When the user's shopping cart is empty but he has a request to buy the product",
    }),
    InternalServerErrorSwagger({
      message:
        'Oops! There was an issue with the product purchase process! | There is a problem in calculating the number of available products and the number of your selected product | There was a problem removing the product from your shopping cart',
      description: 'Server error while processing transaction',
    }),
  );
};

export const VerifyTransactionSwagger = () => {
  return applyDecorators(
    UnauthorizedSwagger(),
    NotFoundErrorSwagger(
      "Transaction not found! | The user's shopping cart was not found!",
    ),
    ApiBadRequestResponse({
      example: {
        statusCode: 400,
        message: 'Payment not confirmed! contact support',
      },
      description:
        'When the transaction is not confirmed by the payment gateway',
    }),
    ApiOkResponse({
      example: { message: 'Payment has been made successfully!' },
      description: 'The transaction is successfully confirmed.',
    }),
    InternalServerErrorSwagger({
      message:
        'There is a problem in confirming the transaction! Try again or contact support | Oops! There was an issue with the clear user basket!',
      description: 'Server error while processing transaction',
    }),
  );
};

export const DeleteTransactionSwagger = () => {
  return applyDecorators(
    UnauthorizedSwagger(),
    ApiParam({
      name: 'id',
      example: 1,
    }),
    NotFoundErrorSwagger('Transaction not found!'),
    ApiOkResponse({
      example: {
        message: 'The transaction was successfully deleted',
        transaction: { id: 1 },
      },
    }),
    InternalServerErrorSwagger({
      message: 'Oops! Server error when deleting transaction',
      description: 'Server error when deleting transaction',
    }),
  );
};
