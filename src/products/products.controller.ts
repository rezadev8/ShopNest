import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { EditProductDto } from './dtos/edit-product.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/products.entity';
import {
  CreateProductSwagger,
  DeleteProductSwagger,
  EditProductSwagger,
  GetAllProductsSwagger,
  GetProductSwagger,
  SearchOnProductsSwagger,
} from './decorators/products.swagger';
import { SearchProductDto } from './dtos/search-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GetProductSwagger()
  @Get('product/:id')
  async getProduct(@Param() { id }: { id: number }) {
    const product = await this.productService.findOne(id);

    if (!product)
      throw new NotFoundException(
        'Too bad ! Your desired product was not found :(',
      );

    return product;
  }

  @CreateProductSwagger()
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

  @EditProductSwagger()
  @Roles(Role.ADNIM)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Patch('product/:id')
  editProduct(@Param() { id }, @Body() editProductDto: EditProductDto) {
    return this.productService.editProduct(id, editProductDto);
  }

  @DeleteProductSwagger()
  @Roles(Role.ADNIM)
  @UseGuards(AuthGuard)
  @Delete('product/:id')
  deleteProduct(@Param() { id }) {
    return this.productService.deleteProduct(id);
  }

  @GetAllProductsSwagger()
  @Get()
  getAll(@Query() query: { skip: number; take: number }) {
    const { skip, take } = query;
    return this.productService.findAll(skip, take);
  }

  @SearchOnProductsSwagger()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('search')
  searchProduct(@Body() searchProductDto: SearchProductDto) {
    return this.productService.searchProduct(searchProductDto.productName);
  }
}
