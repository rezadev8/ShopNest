import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Basket } from './entities/baskets';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { userInterface } from 'src/users/types/user';
import { UserService } from 'src/users/users.service';
import { Product } from 'src/products/entities/products.entity';
import { BasketProduct } from './entities/basket-product';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket) private basketRepository: Repository<Basket>,
    @InjectRepository(BasketProduct)
    private basketProductRepository: Repository<BasketProduct>,
    private readonly userService: UserService,
  ) {}

  async getBasketProducts(userId: number) {
    try {
      const basketProducts = this.basketRepository.find({
        where: { user: { id: userId } },
        relations: {
          basketProducts: {product:true},
        },
      });

      return basketProducts;
    } catch (error) {
      throw new InternalServerErrorException(
        'Uh-oh! We hit a snag getting your basket products!',
      );
    }
  }

  async findOne(userId: number) {
    return await this.basketRepository.findOne({
      where: { user: { id: userId } },
      relations: { basketProducts: true, user: true },
    });
  }

  async findOneBasketProduct(basketId: number, productId: number) {
    return await this.basketProductRepository.findOne({
      where: { basket: { id: basketId }, product: { id: productId } },
      relations: { product: true },
    });
  }

  async createUserBasket(user: User) {
    return this.basketRepository.create({ basketProducts: [], user });
  }

  async saveUserBasket(basket: Basket) {
    return this.basketRepository.save(basket);
  }

  async addProductToBasket(product: Product, userInfo: userInterface) {
    try {
      const user = await this.userService.findOne(userInfo.id);
      let userBasket = await this.findOne(user.id);
      if (!userBasket) {
        const createUserBasket = await this.createUserBasket(user);
        userBasket = await this.saveUserBasket(createUserBasket);
      }
  
      let basketProduct = await this.findOneBasketProduct(
        userBasket.id,
        product.id,
      );
  
      if (basketProduct) {
        basketProduct.quantity++;
      } else {
        basketProduct = this.basketProductRepository.create({
          basket: userBasket,
          product,
          quantity: 1,
        });
      }
  
      await this.basketProductRepository.save(basketProduct);
  
      return {
        product: basketProduct.product,
        quantity:basketProduct.quantity
      };
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Uh-oh! We hit a snag on adding product to your basket!')
    }
  }

  async deleteProductBasket(productBasket: BasketProduct) {
    try {
      return await this.basketProductRepository.delete(productBasket);
    } catch (error) {
      throw new InternalServerErrorException(
        'There was a problem removing the product from your shopping cart!',
      );
    }
  }

  async handleRemoveProduct(product: Product, userId: number) {
    try {
      const findBasketProduct = await this.basketProductRepository.findOne({
        where: {
          product: { id: product.id },
          basket: { user: { id: userId } },
        },
      });

      if (!findBasketProduct)
        throw new NotFoundException('This product is not in your basket!');

      if (findBasketProduct.quantity > 1) {
        findBasketProduct.quantity--;
        await this.basketProductRepository.save(findBasketProduct);
      } else {
        await this.deleteProductBasket(findBasketProduct);
      }

      return {
        message: 'The product has been removed from your shopping cart',
        product:{id:product.id}
      };
    } catch (error) {
      if (error.response) throw error;
      throw new InternalServerErrorException(
        'There was a problem removing the product from your shopping cart',
      );
    }
  }
}
