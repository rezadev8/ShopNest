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

const ProductIdIsMandatorySwagger = () =>
  ApiResponse({
    status: 422,
    example: {
      statusCode: 422,
      message: 'Really? You expect me to find the product without an ID?',
    },
    description: 'Product ID is mandatory',
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
    ProductIdIsMandatorySwagger(),
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
    ProductIdIsMandatorySwagger(),
    ProductNotFoundSwagger(),
    ProductIdParamSwagger(),
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
