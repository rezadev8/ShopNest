import { Controller, Delete, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { BasketService } from './baskets.service';
import { JwtAuthGuard } from 'src/auth/jwt/guards/auth.guard';
import { userInterface } from 'src/users/types/user';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { AddProductToBasketSwagger, GetUserBasketSwagger, RemoveProductFromBasket } from './decorators/baskets.swagger';
import { UnauthorizedSwagger } from 'src/common/decorators/global.swagger.decorator';

@UnauthorizedSwagger()
@UseGuards(JwtAuthGuard)
@ApiTags('Baskets')
@Controller('baskets')
export class BasketsController {
  constructor(private basketService: BasketService) {}

  @GetUserBasketSwagger()
  @Get('/basket')
  getBasket(@CurrentUser() user: userInterface){
    return this.basketService.getBasketProducts(user.id)
  }

  @HttpCode(200)
  @AddProductToBasketSwagger()
  @Post('/:productId/add')
  addProductToBasket(@Req() req, @CurrentUser() user: userInterface) {
    const product = req.product;
    return this.basketService.addProductToBasket(product, user);
  }

  @RemoveProductFromBasket()
  @Delete('/:productId/delete')
  removeProductFromBasket(@Req() req, @CurrentUser() user: userInterface) {
    const product = req.product;

    return this.basketService.handleRemoveProduct(product , user.id);
  }
}
