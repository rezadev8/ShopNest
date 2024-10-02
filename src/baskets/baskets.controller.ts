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
    return this.basketService.findOne(user.id)
  }

  @UseGuards(AuthGuard)
  @Post('/add/:productId')
  addProduct(@Req() req, @CurrentUser() user: userInterface) {
    const product = req.product;
    return this.basketService.addProductToBasket(product, user);
  }

  @Delete('/delete/:productId')
  deleteProduct() {
    return this.basketService;
  }
}
