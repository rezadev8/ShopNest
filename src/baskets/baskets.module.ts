import { Module } from '@nestjs/common';
import { BasketsController } from './baskets.controller';
import { BasketService } from './baskets.service';
import { ProductModule } from 'src/products/products.module';
import { ProductService } from 'src/products/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/products.entity';
import { User } from 'src/users/entities/users.entity';
import { Basket } from './entities/baskets';

@Module({
  imports:[TypeOrmModule.forFeature([Basket, Product , User]) , ProductModule],
  controllers: [BasketsController],
  providers: [BasketService , ProductService]
})
export class BasketsModule {}
