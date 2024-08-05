import { Injectable, NotFoundException } from '@nestjs/common';
import { Basket } from './entities/baskets';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/products/products.service';
import { userInterface } from 'src/users/types/user';
import { UserService } from 'src/users/users.service';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket) private basketRepository: Repository<Basket>,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async addProduct(productId:number , userInfo:userInterface) {
    const product = await this.productService.findOne(productId);
    if(!product) throw new NotFoundException("Oops! Couldn't find that product!");

    const user = await this.userService.findOne(userInfo.id);
    let userBasket = await this.findOne(user.id);
    
    console.log(userBasket)

    if(!userBasket) userBasket = this.basketRepository.create({products:[] , user});

    userBasket.products.push(product);

    return this.basketRepository.save(userBasket);
  }

  async findOne(userId:number){
    return this.basketRepository.findOne({where:{user:{id:userId}} , relations:{products:true}});
  }
}
