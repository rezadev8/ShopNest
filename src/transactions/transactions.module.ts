import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { User } from 'src/users/entities/users.entity';
import { Product } from 'src/products/entities/products.entity';
import { Transaction } from './entities/transactions.entitie';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketService } from 'src/baskets/baskets.service';
import { Basket } from 'src/baskets/entities/baskets';
import { BasketProduct } from 'src/baskets/entities/basket-product';
import { ProductService } from 'src/products/products.service';
import { UserService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Product, User , Basket , BasketProduct])],
  controllers: [TransactionsController],
  providers: [TransactionsService , BasketService , ProductService , UserService],
  exports:[TransactionsService]
})
export class TransactionsModule {}
