import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transactions.entitie';
import { Equal, Repository } from 'typeorm';
import { BasketService } from 'src/baskets/baskets.service';
import { UserService } from 'src/users/users.service';
import { v1 as uuidv4 } from 'uuid';
import { Status } from './enums/status.enum';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { plainToInstance } from 'class-transformer';
import { SerializedTransaction } from './types/serializedTransactions';
import { TransactionNotFoundException } from './exceptions/transaction-notfound.exception';
import { ProductService } from 'src/products/products.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @Inject(forwardRef(() => BasketService))
    private readonly basketService: BasketService,
    private readonly usersService: UserService,
    private readonly productService: ProductService,
    @InjectQueue('transactions-queue') private transactionQueue: Queue,
  ) {}

  async addTransactionToQueue(transactionData: any, queueName: string) {
    const job = await this.transactionQueue.add(queueName, transactionData, {
      backoff: 5000,
    });

    const result = await job.finished();

    return result;
  }

  async getTransactions(skip: number, take: number, status: Status) {
    try {
      const [entities, total] = await this.transactionsRepository.findAndCount({
        skip: Number(skip) || 0,
        take: Number(take) || 30,
        where: [{ status }],
      });

      return { transactions: entities, total };
    } catch (error) {
      throw new InternalServerErrorException(
        'Oops! There was an issue with the get transactions',
      );
    }
  }

  async findTransaction(token: string) {
    try {
      return this.transactionsRepository.findOne({
        where: { token, status: Status.PENDING },
        relations: { user: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Oops! There was an issue with the find transaction',
      );
    }
  }

  async processBuyProducts(userId: number) {
    try {
      const user = await this.usersService.findOne(userId);
      await this.changeTransactionStatusByUserId(user.id);

      const findBasket = await this.basketService.findOne(userId);
      if (!findBasket || findBasket.basketProducts.length < 1)
        return {
          status: 400,
          message: 'Your basket is empty. You cannot proceed to checkout',
        };

      const products = [];
      const productsRemoved = [];
      let totalAmount = 0;

      for (const basketProduct of findBasket.basketProducts) {
        const product = basketProduct.product;

        // If more than the stock of a product was selected in the basket, we will remove the extra quantity.
        if (product.quantity < basketProduct.quantity) {
          const removeProductFromBasket =
            await this.basketService.handleRemoveProduct(
              product,
              userId,
              basketProduct.quantity - product.quantity,
              basketProduct,
            );

          productsRemoved.push({
            ...product,
            quantityRemoved: removeProductFromBasket.quantityRemoved,
          });

          basketProduct.quantity = product.quantity;
        }

        products.push(product);
        totalAmount += basketProduct.quantity * product.price;
      }

      const saveTransaction = await this.transactionsRepository.save({
        products,
        amount: totalAmount,
        user,
        token: uuidv4(),
      });

      return {
        status: 200,
        data: {
          productsRemoved,
          transaction: plainToInstance(SerializedTransaction, saveTransaction),
        },
      };
    } catch (error) {
      if (error.response) {
        const { message, statusCode } = error.response;

        return { status: statusCode, message };
      }
      return {
        status: 500,
        message: 'Oops! There was an issue with the product purchase process!',
      };
    }
  }

  async processVerifyPayment(transactionToken: string) {
    try {
      const transaction = await this.findTransaction(transactionToken);

      if (!transaction)
        return { status: 404, message: 'Transaction not found!' };

      // Receive payment confirmation from the payment gateway
      const checkTransaction = true;

      if (!checkTransaction)
        return {
          status: 400,
          message: 'Payment not confirmed! contact support',
        };

      const findBasket = await this.basketService.findOne(transaction.user.id);
      if (!findBasket)
        return {
          status: 404,
          message: "The user's shopping cart was not found!",
        };

      const unavailableProducts = [];

      for (const { product, quantity } of findBasket.basketProducts) {
        const reduceProductQuantity = product.quantity - quantity;
        if (reduceProductQuantity < 0) {
          unavailableProducts.push(product);
        }
      }

      if (unavailableProducts.length > 0) {
        transaction.status = Status.CANCELED;
        await this.transactionsRepository.save(transaction);
        return {
          status: 400,
          message:
            'Unfortunately, these products are out of stock! Contact support for a refund.',
          products: unavailableProducts,
        };
      }

      for (const { product, quantity } of findBasket.basketProducts) {
        const reduceProductQuantity = product.quantity - quantity;
        await this.productService.editProduct(product.id, {
          quantity: reduceProductQuantity,
        });
      }

      await this.basketService.clearUserBasket(findBasket);
      transaction.status = Status.CONFIRMED;
      await this.transactionsRepository.save(transaction);

      return { status: 200, message: 'Payment has been made successfully!' };
    } catch (error) {
      if (error.response) {
        const { message, statusCode } = error.response;

        return { status: statusCode, message };
      }
      return {
        status: 500,
        message:
          'There is a problem in confirming the transaction! Try again or contact support',
      };
    }
  }

  async changeTransactionStatusByUserId(userId: number) {
    try {
      const transaction = await this.transactionsRepository.findOne({
        where: { user: { id: Equal(userId) }, status: Status.PENDING },
      });

      if (transaction) {
        transaction.status = Status.CANCELED;
        await this.transactionsRepository.save(transaction);
      }

      return { status: 200 };
    } catch (error) {
      throw new InternalServerErrorException(
        'Server error while checking user transaction',
      );
    }
  }

  async changeTransactionStatusById(id: number, status: Status) {
    try {
      const transaction = await this.transactionsRepository.findOne({
        where: { id: Equal(id) },
      });

      if (!transaction) throw new TransactionNotFoundException();
      transaction.status = status;
      await this.transactionsRepository.save(transaction);

      return { message: 'Status changed successfully', transaction: { id } };
    } catch (error) {
      if (!error.status)
        throw new InternalServerErrorException(
          'Oops! Server error while changing transaction status!',
        );
      throw error;
    }
  }

  async getUserTransactions(userId: number) {
    try {
      const user = await this.usersService.findUserByProperties({
        where: { id: Equal(userId) },
        relations: { transactions: true },
      });

      return user.transactions;
    } catch (error) {
      throw new InternalServerErrorException(
        'Oops! Server error while getting user transactions',
      );
    }
  }

  async deleteTransaction(id: number) {
    try {
      const transaction = await this.transactionsRepository.findOne({
        where: { id: Equal(id) },
      });
      if (!transaction) throw new TransactionNotFoundException();

      await this.transactionsRepository.remove(transaction);

      return {
        message: 'The transaction was successfully deleted',
        transaction: { id },
      };
    } catch (error) {
      if (!error.response)
        throw new InternalServerErrorException(
          'Oops! Server error when deleting transaction',
        );
      else throw error;
    }
  }
}
