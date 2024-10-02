import { Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BasketService } from './baskets.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { userInterface } from 'src/users/types/user';

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
  addProduct(@Req() req, @CurrentUser() user: userInterface) {
    const product = req.product;
    return this.basketService.addProductToBasket(product, user);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:productId')
  deleteProduct(@Req() req, @CurrentUser() user: userInterface) {
    const product = req.product;

    return this.basketService.handleDeleteProduct(product , user.id);
  }
}
