import { MiddlewareConsumer, Module } from '@nestjs/common';
import { BasketsController } from './baskets.controller';
import { BasketService } from './baskets.service';
import { ProductModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/products.entity';
import { User } from 'src/users/entities/users.entity';
import { Basket } from './entities/baskets';
import { ProductExistenceMiddlewareMiddleware } from './middlewares/product-existence-middleware.middleware';
import { BasketProduct } from './entities/basket-product';

@Module({
  imports:[TypeOrmModule.forFeature([Basket, Product , User , BasketProduct]) , ProductModule],
  controllers: [BasketsController],
  providers: [BasketService ]
})
export class BasketsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProductExistenceMiddlewareMiddleware)
      .forRoutes('/baskets/:productId/add' , '/baskets/:productId/delete')
  }
}
