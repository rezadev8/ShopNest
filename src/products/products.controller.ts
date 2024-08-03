import { Body, Controller, Get, HttpCode, NotFoundException, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { NewProductDto } from './dtos/new-product.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('products')
export class ProductController {
    constructor(private readonly productService:ProductService){}
    @Get('product/:id')
    async getProduct(@Param() id:number){
        const product = await this.productService.findOne(id);

        if(!product) throw new NotFoundException("Too bad ! Your desired product was not found :(");
        
        return product;
    }

    @UsePipes(new ValidationPipe({transform:true}))
	@UseGuards(AuthGuard)
    @Post('new')
    newPoduct(@CurrentUser() currentUser, @Body() newProductDto:NewProductDto){
        return this.productService.createProduct(newProductDto , currentUser)
    }
}
