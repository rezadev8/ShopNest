# ShopNest

**ShopNest** is an e-commerce platform built with **NestJS**, designed to demonstrate a clean and well-structured project that covers essential functionalities such as user management, product handling, shopping cart, ticketing system, and more. This project aims to help developers understand how to implement RESTful APIs, JWT-based authentication, RBAC security, and CRUD operations in NestJS.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
  - [App](#app)
  - [Auth](#auth)
  - [Baskets](#baskets)
  - [Blog](#blog)
  - [Products](#products)
  - [Tickets](#tickets)
  - [Users](#users)
- [Security](#security)
- [License](#license)

---

## Features

- **User Management**: Admin can manage, delete, and retrieve user information.
- **Ticketing System**: Users can create tickets, and admins can respond, update status, or delete tickets.
- **Product Management**: Admins can add, edit, and delete products.
- **Shopping Cart**: Users can manage their shopping baskets by adding, retrieving, or deleting items.
- **Authentication**: JWT-based authentication with role-based access control (RBAC) for protecting routes.
- **CRUD Operations**: Fully implemented Create, Read, Update, Delete (CRUD) functionality for all resources.

---

## Installation

To run ShopNest locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/shopnest.git
    cd shopnest
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables. Create a `.env` file in the root directory and add the following variables:
    ```bash
    DATABASE_URL=<your-database-url>
    JWT_SECRET=<your-jwt-secret>
    ```

4. Run the application:
    ```bash
    npm run start
    ```

---

## API Routes

### App
- `GET /` : Returns basic information about the application.

### Auth
- `POST /auth/login` : Authenticate users and provide a JWT token.
- `POST /auth/register` : Register a new user.

### Baskets
- `GET /baskets` : Retrieve the current user's shopping basket.
- `POST /baskets/add` : Add an item to the basket.
- `DELETE /baskets/remove` : Remove an item from the basket.

### Blog
- `GET /blog` : Get a list of blog posts.
- `POST /blog/create` : Admins can create a new blog post.

### Products
- `GET /products` : Retrieve a list of products.
- `POST /products/create` : Admins can add a new product.
- `PUT /products/update/:id` : Admins can update a product.
- `DELETE /products/delete/:id` : Admins can delete a product.

### Tickets
- `POST /tickets/create` : Users can create a new ticket.
- `GET /tickets` : Admins can view all tickets.
- `PUT /tickets/update/:id` : Admins can update the status of a ticket.
- `DELETE /tickets/delete/:id` : Admins can delete a ticket.

### Users
- `GET /users` : Retrieve all users (admin only).
- `DELETE /users/delete/:id` : Admins can delete a user.

---

## Security

ShopNest uses **JWT (JSON Web Token)** for authentication and **RBAC (Role-Based Access Control)** to secure different routes based on user roles. Regular users have limited access, while admins have full control over the resources.