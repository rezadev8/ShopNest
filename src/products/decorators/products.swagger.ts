import { applyDecorators } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { Product } from '../entities/products.entity';

export const GetProductSwagger = () => {
  return applyDecorators(
    ApiParam({
      name: 'id',
      required: true,
      description: 'Product id',
      type: 'integer',
    }),
    ApiResponse({
      description: 'Successfully received the product',
      type: Product,
      status: 200,
      example: {
        id: 1,
        name: 'Keyboard',
        price: 32,
        description:
          'This keyboard was made by Super Man and it emits lasers from its buttons',
        cover: '/keyboard.png',
        createdAt: '2024-10-05T09:26:25.738Z',
        updatedAt: '2024-10-05T09:26:25.738Z',
      },
    }),
    ApiResponse({
      description: 'Product not found',
      example: {
        message: 'Too bad ! Your desired product was not found :(',
        error: 'Not Found',
        statusCode: 404,
      },
      status: 404,
    }),
  );
};
