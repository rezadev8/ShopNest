import { MiddlewareConsumer, Module } from '@nestjs/common';
import { BasketsController } from './baskets.controller';
import { BasketService } from './baskets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/products.entity';
import { User } from 'src/users/entities/users.entity';
import { Basket } from './entities/baskets';
import { ProductExistenceMiddlewareMiddleware } from './middlewares/product-existence-middleware.middleware';
import { BasketProduct } from './entities/basket-product';
import { ProductService } from 'src/products/products.service';
import { UserService } from 'src/users/users.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { Transaction } from 'src/transactions/entities/transactions.entity';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Basket,
      Product,
      User,
      BasketProduct,
      Transaction,
    ]),
    BullModule.registerQueue({
      name: 'transactions-queue',
    }),
  ],
  controllers: [BasketsController],
  providers: [BasketService, ProductService, UserService, TransactionsService],
  exports: [BasketService],
})
export class BasketsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProductExistenceMiddlewareMiddleware)
      .forRoutes('/baskets/:productId/add', '/baskets/:productId/delete');
  }
}
