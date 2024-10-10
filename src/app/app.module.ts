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
import { App } from './entities/app-info.entitie';
import { Ticket } from 'src/tickets/entities/tickets.entitie';
import { TicketsModule } from 'src/tickets/tickets.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { Transaction } from 'src/transactions/entities/transactions.entitie';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', '..', 'public') }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
      entities: [User , Product , Basket , BasketProduct ,  Post , App , Ticket , Transaction],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([App]),
    UserModule,
    AuthModule,
    ProductModule,
    BasketsModule,
    BlogModule,
    TicketsModule,
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
