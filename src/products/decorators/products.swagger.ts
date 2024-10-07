import { applyDecorators } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Product } from '../entities/products.entity';
import {
  InternalServerErrorSwagger,
  PaginationQuerySwagger,
} from 'src/common/decorators/global.swagger.decorator';
import { productExample, userExample } from 'src/common/data/api.swagger';

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
      example: productExample,
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

export const CreateProductSwagger = () => {
  return applyDecorators(
    ApiResponse({
      example: {
        ...productExample,
        owner: userExample,
      },
      description: 'Product created successfuly',
      status: 200,
    }),
    InternalServerErrorSwagger({
      description: 'Server error in product creation',
      message: 'Uh-oh! We hit a snag creating your product!',
    }),
  );
};

export const EditProductSwagger = () => {
  return applyDecorators(
    ApiParam({
      name: 'id',
      required: true,
      description: 'Product id',
      type: 'integer',
    }),
    ApiResponse({
      example: {
        message: 'Product edited successfuly',
        product: {
          id: 1,
        },
      },
      status: 200,
    }),
    ApiResponse({
      example: {
        message: 'Product not found!',
        error: 'Not Found',
        statusCode: 404,
      },
      status: 404,
    }),
    InternalServerErrorSwagger({
      description: 'Server error in product editing',
      message: 'Uh-oh! We hit a snag editing your product!',
    }),
  );
};

export const DeleteProductSwagger = () => {
  return applyDecorators(
    ApiParam({
      name: 'id',
      required: true,
      description: 'Product id',
      type: 'integer',
    }),
    ApiResponse({
      description: 'Product deleted successfuly',
      example: {
        message: 'Product deleted successfuly',
        product: {
          id: 1,
        },
      },
      status: 200,
    }),
    ApiResponse({
      example: {
        message: 'Product not found!',
        error: 'Not Found',
        statusCode: 404,
      },
      status: 404,
    }),
    InternalServerErrorSwagger({
      description: 'Server error in product deleting',
      message: 'Uh-oh! We hit a snag deleting your product!',
    }),
  );
};

export const GetAllProductsSwagger = () => {
  return applyDecorators(
    PaginationQuerySwagger({
      skipDesc: 'How many products are skipped?',
      takeDesc: 'How many products are taken?',
    }),
    ApiResponse({
      example: {
        products: [productExample],
        total: 1,
      },
      status: 200,
      description: 'Successfully received all products',
    }),
    InternalServerErrorSwagger({
      description: 'Server error in get products',
      message: 'Unfortunately, there was an issue on getting products!',
    }),
  );
};

export const SearchOnProductsSwagger = () => {
  return applyDecorators(
    ApiResponse({
      example: [productExample],
      status: 200,
      description: 'Product search was done successfully',
    }),
    InternalServerErrorSwagger({
      description: 'Server error in product search',
      message: 'Uh-oh! We hit a snag searching on products!',
    }),
  );
};
