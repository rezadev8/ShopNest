import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { UserService } from 'src/users/users.service';
import { User } from 'src/users/entities/users.entity';
import { Transaction } from 'src/transactions/entities/transactions.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product , User , Transaction]) ],
  controllers: [ProductController],
  providers: [ProductService , UserService],
  exports:[ProductService]
})
export class ProductModule {}
