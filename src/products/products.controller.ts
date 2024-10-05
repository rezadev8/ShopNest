import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { NewProductDto } from './dtos/new-product.dto';
import { userInterface } from 'src/users/types/user';
import { Request } from 'express';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { EditProductDto } from './dtos/edit-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('product/:id')
  async getProduct(@Param() { id }: { id: number }) {
    const product = await this.productService.findOne(id);

    if (!product)
      throw new NotFoundException(
        'Too bad ! Your desired product was not found :(',
      );

    return product;
  }

  @Roles(Role.ADNIM)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Post('product')
  newPoduct(
    @CurrentUser() currentUser: userInterface,
    @Body() newProductDto: NewProductDto,
  ) {
    return this.productService.createProduct(newProductDto, currentUser);
  }

  @Roles(Role.ADNIM)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Patch('product/:id')
  editProduct(@Param() { id }, @Body() editProductDto: EditProductDto) {
    return this.productService.editProduct(id, editProductDto);
  }

  @Get()
  getAll() {
    return this.productService.findAll();
  }

  @HttpCode(200)
  @Post('search')
  searchProduct(@Req() req: Request) {
    const { productName } = req.body;

    return this.productService.searchProduct(productName);
  }
}
