import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiQuery, ApiResponse } from '@nestjs/swagger';

export const UnauthorizedSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      example: {
        message:
          "You're looking a bit suspicious, my friend. Please re-authenticate! :)",
        error: 'Unauthorized',
        statusCode: 401,
      },
      description:
        'The user is not authenticated, or has been deleted from the database',
      status: 401,
    }),
  );
};

export const InternalServerErrorSwagger = ({ description, message }) => {
  return applyDecorators(
    ApiResponse({
      example: {
        message,
        error: 'Internal Server Error',
        statusCode: 500,
      },
      description,
      status: 500,
    }),
  );
};

export const NotFoundErrorSwagger = (message: string) =>{
  return ApiNotFoundResponse({
    example: {
      message,
      error: 'Not Found',
      statusCode: 404,
    },
  });}

export const PaginationQuerySwagger = ({ skipDesc, takeDesc }) => {
  return applyDecorators(
    ApiQuery({
      name: 'skip',
      type: 'integer',
      required: false,
      description: skipDesc,
    }),
    ApiQuery({
      name: 'take',
      type: 'integer',
      required: false,
      description: takeDesc,
    }),
  );
};
