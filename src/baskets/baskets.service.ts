import {
  forwardRef,
  Inject,
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
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket) private basketRepository: Repository<Basket>,
    @InjectRepository(BasketProduct)
    private basketProductRepository: Repository<BasketProduct>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => TransactionsService))
    private readonly transactionsService:TransactionsService
  ) {}

  async getBasketProducts(userId: number) {
    try {
      const basketProducts = this.basketRepository.find({
        where: { user: { id: userId } },
        relations: {
          basketProducts: { product: true },
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
      relations: { basketProducts: { product: true }, user: true },
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

      await this.transactionsService.changeTransactionStatusByUserId(user.id);
      await this.basketProductRepository.save(basketProduct);

      return {
        product: basketProduct.product,
        quantity: basketProduct.quantity,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Uh-oh! We hit a snag on adding product to your basket!',
      );
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

  async handleRemoveProduct(
    product: Product,
    userId: number,
    removeQuantity?: number,
  ) {
    try {
      const findBasketProduct = await this.basketProductRepository.findOne({
        where: {
          product: { id: product.id },
          basket: { user: { id: userId } },
        },
      });

      let quantityRemoved = 0;

      if (!findBasketProduct)
        throw new NotFoundException('This product is not in your basket!');

      if (findBasketProduct.quantity > 1) {
        if (removeQuantity) {
          if (removeQuantity <= findBasketProduct.quantity){
            findBasketProduct.quantity -= removeQuantity;
            quantityRemoved = removeQuantity;
          }
          else
            throw new InternalServerErrorException(
              'There is a problem in calculating the number of available products and the number of your selected product',
            );
        } else {
          findBasketProduct.quantity--;
          quantityRemoved = 1;
        }
        await this.basketProductRepository.save(findBasketProduct);
      } else {
        quantityRemoved = 1;
        await this.deleteProductBasket(findBasketProduct);
      }

      if(!removeQuantity) await this.transactionsService.changeTransactionStatusByUserId(userId);

      return {
        message: 'The product has been removed from your shopping cart',
        product: { id: product.id },
        quantityRemoved
      };
    } catch (error) {
      if (error.response) throw error;
      throw new InternalServerErrorException(
        'There was a problem removing the product from your shopping cart',
      );
    }
  }

  async clearUserBasket(basket:Basket){
    try {
      await this.basketProductRepository.delete({basket})
      await this.basketRepository.save({...basket , basketProducts:[]});

      return {status:200}
    } catch (error) {
      throw new InternalServerErrorException('Oops! There was an issue with the clear user basket!')
    }
  }
}
