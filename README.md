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

اگر پروژه رو با **Swagger** تعریف کردی و API ها به طور کامل مستندسازی شدن، نیازی نیست تمام جزئیات API رو مجدد در داکیومنت اصلی توضیح بدی. می‌تونی به صورت کلی به Swagger اشاره کنی و لینک دسترسی به داکیومنت Swagger رو قرار بدی. این باعث می‌شه داکیومنت اصلی سبک‌تر و قابل‌فهم‌تر بشه و تمرکز اصلی روی نکات کلی و نحوه راه‌اندازی پروژه باشه.

برای مثال، به جای ذکر دقیق API ها، می‌تونی بخشی به این شکل در داکیومنت اضافه کنی:

---

## API Documentation

All API routes and their specifications are documented using **Swagger**. You can access the full API documentation by running the application and navigating to:

```
http://localhost:2000/api
```

This Swagger documentation provides a complete reference to all available routes, request parameters, and response formats for the **ShopNest** project.

---

## Security

ShopNest uses **JWT (JSON Web Token)** for authentication and **RBAC (Role-Based Access Control)** to secure different routes based on user roles. Regular users have limited access, while admins have full control over the resources.