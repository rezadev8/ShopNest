import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { userExample } from 'src/common/data/api.swagger';
import {
  InternalServerErrorSwagger,
  NotFoundErrorSwagger,
  PaginationQuerySwagger,
} from 'src/common/decorators/global.swagger.decorator';

const UserNotFoundSwagger = () => NotFoundErrorSwagger('User not found!');

export const GetAllUsersSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
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
        users: [userExample],
        total: 5,
      },
      description: 'Successfully received users',
    }),
  );
};

export const DeleteUserSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiParam({ name: 'id', required: true, description: 'User id' }),
    ApiResponse({ status: 200 }),
    UserNotFoundSwagger(),
    InternalServerErrorSwagger({
      description: 'Server error deleting user',
      message: 'Unfortunately, there was an issue on deleting user!',
    }),
  );
};

export const GetUserByIdSwagger = () => {
  return applyDecorators(
    ApiParam({ name: 'id', description: 'User id', required: true }),
    ApiResponse({ status: 200, example: userExample }),
    UserNotFoundSwagger(),
    InternalServerErrorSwagger({
      description: 'Server error getting user',
      message: 'Unfortunately, there was an issue on getting user!',
    }),
  );
};

export const GetUserSwagger = () => {
  return applyDecorators(
    ApiResponse({ status: 200, example: userExample }),
    UserNotFoundSwagger(),
    InternalServerErrorSwagger({
      description: 'Server error getting user',
      message: 'Unfortunately, there was an issue on getting user!',
    }),
  );
};
