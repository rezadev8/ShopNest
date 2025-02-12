import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { User } from 'src/users/entities/users.entity';
import { Product } from 'src/products/entities/products.entity';
import { Transaction } from './entities/transactions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketService } from 'src/baskets/baskets.service';
import { Basket } from 'src/baskets/entities/baskets';
import { BasketProduct } from 'src/baskets/entities/basket-product';
import { UserService } from 'src/users/users.service';
import { BullModule } from '@nestjs/bull';
import { TransactionsProcessor } from './transactions.processor';
import { ProductService } from 'src/products/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Transaction,
      Product,
      User,
      Basket,
      BasketProduct,
    ]),
    BullModule.registerQueue({
      name: 'transactions-queue',
    }),
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    BasketService,
    UserService,
    TransactionsProcessor,
    ProductService
  ],
  exports: [TransactionsService],
})
export class TransactionsModule {}
