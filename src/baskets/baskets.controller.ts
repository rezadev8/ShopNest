import { Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BasketService } from './baskets.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { userInterface } from 'src/users/types/user';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('baskets')
export class BasketsController {
  constructor(private basketService: BasketService) {}

  @UseGuards(AuthGuard)
  @Get('/basket')
  getBasket(@CurrentUser() user: userInterface){
    return this.basketService.getBasketProducts(user.id)
  }

  @UseGuards(AuthGuard)
  @Post('/add/:productId')
  addProductToBasket(@Req() req, @CurrentUser() user: userInterface) {
    const product = req.product;
    return this.basketService.addProductToBasket(product, user);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:productId')
  deleteProductFromBasket(@Req() req, @CurrentUser() user: userInterface) {
    const product = req.product;

    return this.basketService.handleDeleteProduct(product , user.id);
  }
}
