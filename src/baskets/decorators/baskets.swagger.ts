import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiParam, ApiResponse } from '@nestjs/swagger';
import { productExample } from 'src/common/data/api.swagger';
import {
  InternalServerErrorSwagger,
  NotFoundErrorSwagger,
} from 'src/common/decorators/global.swagger.decorator';

const ProductNotFoundSwagger = () =>
  NotFoundErrorSwagger("Oops! Couldn't find that product!");

const ProductIdParamSwagger = () =>
  ApiParam({
    name: 'productId',
    required: true,
    description: 'Product ID',
  });

export const GetUserBasketSwagger = () => {
  return applyDecorators(
    ApiResponse({
      description: "Get the products of the user's shopping cart",
      example: [
        {
          id: 1,
          createdAt: '2024-10-05T12:37:34.456Z',
          updatedAt: '2024-10-05T12:37:34.456Z',
          basketProducts: [productExample],
        },
      ],
      status: 200,
    }),
    InternalServerErrorSwagger({
      description:
        "Error in receiving the products of the user's shopping cart",
      message: 'Uh-oh! We hit a snag getting your basket products!',
    }),
  );
};

export const AddProductToBasketSwagger = () => {
  return applyDecorators(
    ProductNotFoundSwagger(),
    ProductIdParamSwagger(),
    ApiResponse({
      description:
        "The product has been successfully added to the user's shopping cart",
      example: { ...productExample, quantity: 1 },
      status: 200,
    }),
    InternalServerErrorSwagger({
      message: 'Uh-oh! We hit a snag on adding product to your basket!',
      description: "Error while adding product to user's shopping cart",
    }),
  );
};

export const RemoveProductFromBasket = () => {
  return applyDecorators(
    ProductIdParamSwagger(),
    ApiNotFoundResponse({
      example: {
        message: 'This product is not in your basket!',
        error: 'Not Found',
        statusCode: 404,
      },
      description:
        "There is no product with this ID in the user's shopping cart to be deleted",
    }),
    ApiResponse({
      example: {
        message: 'The product has been removed from your shopping cart',
        product: { id: 1 },
      },
      status: 200,
      description:
        "Successful removal of the product from the user's shopping cart. (if more than one product is in the user's shopping cart, it will not be completely removed. Only one item will be removed from the shopping cart)",
    }),
    InternalServerErrorSwagger({
      message:
        'There was a problem removing the product from your shopping cart',
      description:
        "Server error in removing the product from the user's shopping cart",
    }),
  );
};
