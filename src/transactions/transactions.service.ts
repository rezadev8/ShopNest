import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transactions.entitie';
import { Repository } from 'typeorm';
import { BasketService } from 'src/baskets/baskets.service';
import { UserService } from 'src/users/users.service';
import { v1 as uuidv4 } from 'uuid';
import { Status } from './enums/status.enum';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @Inject(forwardRef(() => BasketService))
    private readonly basketService: BasketService,
    private readonly usersService: UserService,
  ) {}

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

  async buyPlan(userId: number) {
    try {
      const findBasket = await this.basketService.findOne(userId);
      const user = await this.usersService.findOne(userId);
      const products = [];
      const productsRemoved = [];
      let totalAmount = 0;

      await this.changeTransactionStatusByUserId(user.id);

      if (findBasket.basketProducts.length < 1)
        throw new BadRequestException(
          'Your basket is empty. You cannot proceed to checkout',
        );

      for (const basketProduct of findBasket.basketProducts) {
        const product = basketProduct.product;

        // If more than the stock of a product was selected in the basket, we will remove the extra quantity.
        if (product.quantity < basketProduct.quantity) {
          const removeProductFromBasket =
            await this.basketService.handleRemoveProduct(
              product,
              userId,
              basketProduct.quantity - product.quantity,
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

      return { productsRemoved, transaction: saveTransaction };
    } catch (error) {
      console.log(error);
      if (!error.response)
        throw new InternalServerErrorException(
          'Oops! There was an issue with the product purchase process!',
        );
      throw error;
    }
  }

  async verifyPayment(transactionToken: string) {
    try {
      const transaction = await this.findTransaction(transactionToken);

      if (!transaction) throw new NotFoundException('Transaction not found!');

      // Receive payment confirmation from the payment gateway
      const checkTransaction = true;

      if (!checkTransaction) {
        throw new BadRequestException('Payment not confirmed! contact support');
      }

      const findBasket = await this.basketService.findOne(transaction.user.id);
      if (!findBasket)
        throw new NotFoundException("The user's shopping cart was not found!");

      await this.basketService.clearUserBasket(findBasket);

      transaction.status = Status.CONFIRMED;

      await this.transactionsRepository.save(transaction);

      return { message: 'Payment has been made successfully!' };
    } catch (error) {
      console.log(error);
      if (!error.response)
        throw new InternalServerErrorException(
          'There is a problem in confirming the transaction! Try again or contact support',
        );
      throw error;
    }
  }

  async changeTransactionStatusByUserId(userId: number) {
    try {
      const transaction = await this.transactionsRepository.findOne({
        where: { user: { id: userId }, status: Status.PENDING },
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

  async changeTransactionStatusByToken(token: string, status: Status) {
    try {
      const transaction = await this.transactionsRepository.findOne({
        where: { token },
      });

      if (!transaction) throw new NotFoundException('Transaction not found!');
      transaction.status = status;
      await this.transactionsRepository.save(transaction);

      return { message: 'Status changed successfully', transaction: { token } };
    } catch (error) {
      if (!error.status)
        throw new InternalServerErrorException(
          'Oops! Server error while changing transaction status!',
        );
      throw error;
    }
  }
}
