# ShopNest - E-commerce Backend API

This repository contains the backend API for **ShopNest**, an e-commerce application built using **NestJS**. It is designed to be a learning resource for those interested in mastering **NestJS**, as well as a robust backend solution for developers building e-commerce platforms or integrating with frontend applications.

## API Documentation

The API is fully documented with **Swagger**, and you can access it via [this link](https://nest-shop.liara.run/api).

## Features

- **Authentication System**: Utilizes **JWT** for secure authentication.
- **Role-Based Access Control (RBAC)**: Supports two roles:
  - `User`: Basic user permissions.
  - `Admin`: Elevated privileges for managing the platform.
- **Queuing System**: Implements **Bull** for job queuing, ensuring efficient processing of tasks.
- **CRUD Operations**: Complete **CRUD** (Create, Read, Update, Delete) actions are available for all routes, making it easy to manage resources.
- **Swagger Integration**: Interactive API documentation is available via Swagger for testing and understanding the endpoints.

## Prerequisites

Make sure you have **Redis** and **MySQL** installed on your system before running the project.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/shopnest.git
   cd shopnest
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables by creating a `.env` file in the root of the project. Here is the required structure for the `.env` file:

   ```
   PORT=
   JWTSECRET=
   
   DB_HOST=
   DB_PORT=
   DB_USERNAME=
   DB_PASSWORD=
   DB_NAME=
   
   REDIS_PASSWORD=
   REDIS_PORT=
   REDIS_HOST=
   ```

4. Run the application:
   ```bash
   npm run start:dev
   ```

5. Access the API documentation at [http://localhost:3000/api](http://localhost:3000/api).

## Technologies Used

- **NestJS**: A progressive Node.js framework.
- **TypeORM**: ORM for database management.
- **Bull**: Job queue for handling background tasks.
- **JWT**: JSON Web Tokens for authentication.
- **RBAC**: Role-based access control for user permissions.
- **Swagger**: API documentation and testing tool.
- **Redis**: In-memory data structure store used for queuing.
- **MySQL**: Relational database for storing application data.

## Contributions & Feedback

This project is open for contributions and feedback. Feel free to create issues or pull requests. For direct suggestions, you can message me on Telegram at [@rezadev](https://t.me/rezadev).