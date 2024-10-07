import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
import { userExample } from 'src/common/data/api.swagger';
import {
  InternalServerErrorSwagger,
  PaginationQuerySwagger,
} from 'src/common/decorators/global.swagger.decorator';

export const GetAllUsersSwagger = () => {
  return applyDecorators(
    PaginationQuerySwagger({
      skipDesc: 'How many users are skipped?',
      takeDesc: 'How many users are taken?',
    }),
    InternalServerErrorSwagger({
      description: 'Server error in receiving users',
      message: 'Unfortunately, there was an issue on getting users!',
    }),
    ApiResponse({
      status: 200,
      example: {
        users: [
            userExample
        ],
        total: 5,
      },
      description: 'Successfully received users',
    }),
  );
};

export const DeleteUserSwagger = () => {
  return applyDecorators(
    ApiParam({ name: 'id', required: true, description: 'User id' }),
    ApiResponse({ status: 200 }),
    ApiNotFoundResponse({
      example: {
        message: 'User not found!',
        error: 'Not Found',
        statusCode: 404,
      },
      description: 'Use not found error',
    }),
    InternalServerErrorSwagger({
      description: 'Server error deleting user',
      message: 'Unfortunately, there was an issue on deleting user!',
    }),
  );
};
