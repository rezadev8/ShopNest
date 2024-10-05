import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../products/products.module';
import { Product } from '../products/entities/products.entity';
import { BasketsModule } from '../baskets/baskets.module';
import { Basket } from '../baskets/entities/baskets';
import { BasketProduct } from '../baskets/entities/basket-product';
import { BlogModule } from '../blog/blog.module';
import { Post } from '../blog/entities/posts';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'found_404',
      entities: [User , Product , Basket , BasketProduct ,  Post],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProductModule,
    BasketsModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
