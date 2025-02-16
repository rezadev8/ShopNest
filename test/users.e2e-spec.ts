import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/users/entities/users.entity';
import { Ticket } from '../src/tickets/entities/tickets.entity';
import { mockUser } from './mocks/users/users.mock';
import { JwtAuthGuard } from '../src/auth/jwt/guards/auth.guard';
import { JwtRolesGuard } from '../src/auth/jwt/guards/role.guard';
import { Product } from 'src/products/entities/products.entity';
import { Basket } from 'src/baskets/entities/baskets';
import { BasketProduct } from 'src/baskets/entities/basket-product';
import { App } from 'src/app/entities/app-info.entity';
import { Post } from 'src/blog/entities/posts';
import { Transaction } from 'src/transactions/entities/transactions.entity';

//! Note
//! Read the comments I wrote above the commented tests.

//? This e2e test requires a database. So first create your database with the desired name, and then place it here.

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
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn((context) => {
          const request = context.switchToHttp().getRequest();
          request.user = mockUser;

          return true;
        }),
      })
      .overrideGuard(JwtRolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const makeRequest = (
    endpoint: string,
    method: 'get' | 'post' | 'put' | 'delete' = 'get',
  ) => {
    return request(app.getHttpServer())[method](`/users/${endpoint}`);
  };

  it('/ (GET) -> Get users', () => {
    return makeRequest('', 'get').expect(200);
  });

  //? To run this test, you must create at least one user in the users repository. And then enter the user ID in the param section.
  //   it('/:id (DELETE) -> Delete one user' , () => {
  //     return request(app.getHttpServer()).delete('/users/1').expect(200)
  //   });

  it('/:id/user (GET) -> Get user by id', () => {
    return makeRequest('2/user').expect(200);
  });

    //? To run this test, you need to create a user with the mocked user ID in /mocks/users/users.mock.   
//   it('/user (GET) -> Get user by jwt token' , () => {
//     return makeRequest('user').expect(200).expect((res) => {
//         //? You can create a user , then inert your user detail here
//         // expect(res.body).toEqual(mockUser)
//     })
//   })
});
