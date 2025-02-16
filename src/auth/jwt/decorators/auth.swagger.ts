import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { userExample } from 'src/common/data/api.swagger';
import { User } from 'src/users/entities/users.entity';

export const SignUpSwagger = () => {
  return applyDecorators(
    ApiResponse({
      type: User,
      status: 201,
      example: userExample,
    }),
    ApiResponse({
      description: 'Repeat user',
      status: 409,
      example: {
        statusCode: 409,
        message: 'A user with these details already exists!',
      },
    }),
    ApiResponse({
      description: 'Server problem',
      status: 500,
      example: {
        message: 'Unfortunately, there was an issue on creating your account!',
        error: 'Internal Server Error',
        statusCode: 500,
      },
    }),
  );
};

export const SignInSwagger = () => {
  return applyDecorators(
    ApiResponse({
      description: 'Password incorrect',
      example: {
        message: 'Your password’s not right, my friend! 😅',
        error: 'Unauthorized',
        statusCode: 401,
      },
      status: 401,
    }),
    ApiResponse({
      description: 'Incorrect information',
      status: 404,
      example: {
        message: "Strange! Couldn't find a user with those details :(",
        error: 'Not Found',
        statusCode: 404,
      },
    }),
    ApiResponse({
      description: 'Successful login',
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyZXphYmFobWFuaS5kZXZAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MjgyMzM2MTYsImV4cCI6MTczMDgyNTYxNn0.Q3O9V98ItllUthEbgwG_DdLI6BB9qx6TM7J8nbjGC20',
        message: 'Here you go, your token!',
      },
      status: 200,
    }),
  );
};
