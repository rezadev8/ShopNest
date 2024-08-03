import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Repository } from 'typeorm';
import { NewProductDto } from './dtos/new-product.dto';
import { UserService } from 'src/users/users.service';
import { userInterface } from 'src/users/types/user';
import { SerializedUser } from 'src/users/types/serializedUser';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private readonly userService: UserService,
  ) {}

  findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  async createProduct(newProdct: NewProductDto, user: userInterface) {
    const { cover, description, name, price } = newProdct;

    const findUser = await this.userService.findOne(user.id);

    if (!findUser) throw new NotFoundException("Oops! Couldn't find that user!");

    try {
      const product = this.productRepository.create({
        name,
        price,
        cover,
        description,
        owner: findUser,
      });

      const saveProduct = await this.productRepository.save(product);

      return {...saveProduct , owner:plainToClass(SerializedUser, saveProduct.owner)}
    } catch (error) {
      console.log(error);
      
      throw new InternalServerErrorException("Uh-oh! We hit a snag creating your product!")
    }
  }
}
