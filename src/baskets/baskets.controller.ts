import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { BasketService } from './baskets.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { userInterface } from 'src/users/types/user';

@Controller('baskets')
export class BasketsController {

    constructor(private basketService:BasketService){}

    @UseGuards(AuthGuard)
    @Post('/add/:productId')
    addProduct(@Param() {productId} , @CurrentUser() user:userInterface){
        return this.basketService.addProduct(productId , user);
    }
}
