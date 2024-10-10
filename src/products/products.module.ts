import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { UserService } from 'src/users/users.service';
import { User } from 'src/users/entities/users.entity';
import { TransactionsService } from 'src/transactions/transactions.service';
import { Transaction } from 'src/transactions/entities/transactions.entitie';
import { BasketService } from 'src/baskets/baskets.service';
import { Basket } from 'src/baskets/entities/baskets';
import { BasketProduct } from 'src/baskets/entities/basket-product';

@Module({
  imports:[TypeOrmModule.forFeature([Product , User , Transaction , Basket , BasketProduct]) ],
  controllers: [ProductController],
  providers: [ProductService , UserService , TransactionsService , BasketService],
  exports:[ProductService]
})
export class ProductModule {}
