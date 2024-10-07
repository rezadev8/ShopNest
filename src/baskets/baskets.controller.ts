import { Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BasketService } from './baskets.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { userInterface } from 'src/users/types/user';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { AddProductToBasketSwagger, GetUserBasketSwagger, RemoveProductFromBasket } from './decorators/baskets.swagger';

@ApiTags('Baskets')
@Controller('baskets')
export class BasketsController {
  constructor(private basketService: BasketService) {}

  @GetUserBasketSwagger()
  @UseGuards(AuthGuard)
  @Get('/basket')
  getBasket(@CurrentUser() user: userInterface){
    return this.basketService.getBasketProducts(user.id)
  }

  @AddProductToBasketSwagger()
  @UseGuards(AuthGuard)
  @Post('/add/:productId')
  addProductToBasket(@Req() req, @CurrentUser() user: userInterface) {
    const product = req.product;
    return this.basketService.addProductToBasket(product, user);
  }

  @RemoveProductFromBasket()
  @UseGuards(AuthGuard)
  @Delete('/delete/:productId')
  removeProductFromBasket(@Req() req, @CurrentUser() user: userInterface) {
    const product = req.product;

    return this.basketService.handleRemoveProduct(product , user.id);
  }
}
