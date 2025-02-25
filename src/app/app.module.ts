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
import { App } from './entities/app-info.entity';
import { Ticket } from 'src/tickets/entities/tickets.entity';
import { TicketsModule } from 'src/tickets/tickets.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { Transaction } from 'src/transactions/entities/transactions.entity';
import {  ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (config:ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('db.host'),
        port: config.get<number>('db.port'),
        username: config.get<string>('db.username'),
        password: config.get<string>('db.password'),
        database: config.get<string>('db.name'),
        entities: [
          User,
          Product,
          Basket,
          BasketProduct,
          Post,
          App,
          Ticket,
          Transaction,
        ],
        synchronize: true,
      }),
      inject:[ConfigService]
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        password: process.env.REDIS_PASSWORD || '',
      },
    }),
    TypeOrmModule.forFeature([App]),
    UserModule,
    AuthModule,
    ProductModule,
    BasketsModule,
    BlogModule,
    TicketsModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule { }
