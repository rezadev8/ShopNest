import { HttpException, Injectable, NestMiddleware, NotFoundException, Request, Response } from '@nestjs/common';
import { ProductService } from 'src/products/products.service';

@Injectable()
export class ProductExistenceMiddlewareMiddleware implements NestMiddleware {
  constructor(private readonly productService: ProductService) {}

  async use(@Request() req, @Response() res, next: () => void) {
    const productId = req.params?.productId.trim();
    if(!productId) throw new HttpException('Really? You expect me to find the product without an ID?' , 422);

    const product = await this.productService.findOne(productId);
    if(!product) throw new NotFoundException("Oops! Couldn't find that product!");

    req.product = product;

    next();
  }
}
