import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/users/entities/users.entity';
import { Ticket } from '../src/tickets/entities/tickets.entity';
import { mockUser } from './mocks/users/users.mock';
import { AuthGuard } from '../src/auth/guards/auth.guard';
import { RolesGuard } from '../src/auth/guards/role.guard';
import { Product } from 'src/products/entities/products.entity';
import { Basket } from 'src/baskets/entities/baskets';
import { BasketProduct } from 'src/baskets/entities/basket-product';
import { App } from 'src/app/entities/app-info.entity';
import { Post } from 'src/blog/entities/posts';
import { Transaction } from 'src/transactions/entities/transactions.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'shop_nest_test',
          synchronize: true,
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
        }),
      ]
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: jest.fn((context) => {
          const request = context.switchToHttp().getRequest();
          request.user = mockUser;

          return true;
        }),
      })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
  }); 
});
