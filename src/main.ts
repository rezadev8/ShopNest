import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appPort = process.env?.PORT || 3000

  const config = new DocumentBuilder()
    .setTitle('Nest store')
    .addBearerAuth({ type: 'http' })
    .setDescription(`
    ShopNest is a comprehensive e-commerce platform built with NestJS. This project provides APIs to manage users, handle tickets, manage products, view and update transactions, handle user shopping carts, and manage blog articles.

    Key Features:
    - **User Management**: Admins can manage, delete, and retrieve users.
    - **Ticketing System**: Users can create tickets and admins can respond, update ticket statuses, or delete tickets.
    - **Product Management**: Admins can add, edit, and delete products.
    - **Transaction Handling**: Users can purchase products and view or update their transaction statuses.
    - **Shopping Cart Management**: Users can manage their baskets, add or remove items.
    - **Blog Management**: Admins can create and manage blog articles.
    
    The platform is secured using **JWT-based authentication** and uses **RBAC (Role-Based Access Control)** to manage access to different routes. This project serves as a great learning tool for developers looking to understand the structure of a well-organized NestJS project, or for those looking to add a backend project to their portfolio.`)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(appPort , '0.0.0.0');
}

bootstrap();
