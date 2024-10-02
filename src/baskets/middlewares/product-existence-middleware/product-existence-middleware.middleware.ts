import { HttpException, Injectable, NestMiddleware, NotFoundException, Request, Response } from '@nestjs/common';
import { ProductService } from 'src/products/products.service';

@Injectable()
export class ProductExistenceMiddlewareMiddleware implements NestMiddleware {
  constructor(private readonly productService: ProductService) {}

  async use(@Request() req, @Response() res, next: () => void) {
    const productId = req.params?.productId;
    if(!productId) throw new HttpException('واقعا انتظار داری بدون آیدی ، محصول رو پیدا کنم؟' , 422);

    const product = await this.productService.findOne(productId);
    if(!product) throw new NotFoundException("Oops! Couldn't find that product!");

    req.product = product;

    next();
  }
}
