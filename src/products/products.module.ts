import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { UserModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';
import { User } from 'src/users/entities/users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product , User]) , UserModule],
  controllers: [ProductController],
  providers: [ProductService , UserService]
})
export class ProductModule {}
