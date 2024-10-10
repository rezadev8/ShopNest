import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Equal, Like, Repository } from 'typeorm';
import { NewProductDto } from './dtos/new-product.dto';
import { UserService } from 'src/users/users.service';
import { userInterface } from 'src/users/types/user';
import { SerializedUser } from 'src/users/types/serializedUser';
import { plainToInstance } from 'class-transformer';
import { EditProductDto } from './dtos/edit-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private readonly userService: UserService
  ) {}

  findOne(id: number) {
    return this.productRepository.findOne({
      where: { id:Equal(id) },
    });
  }

  findOneByCustomQuery(props: any) {
    return this.productRepository.findOne(props);
  }

  async findAll(skip: number, take: number) {
    try {
      const [entities, total] = await this.productRepository.findAndCount({
        skip: Number(skip) || 0,
        take: Number(take) || 30,
      });

      return { products: entities, total };
    } catch (error) {
      throw new InternalServerErrorException(
        'Unfortunately, there was an issue on getting products!',
      );
    }
  }

  async createProduct(newProdct: NewProductDto, user: userInterface) {
    const findUser = await this.userService.findOne(user.id);

    if (!findUser)
      throw new NotFoundException("Oops! Couldn't find that user!");

    try {
      const product = this.productRepository.create({
        ...newProdct,
        owner: findUser
      });

      const saveProduct = await this.productRepository.save(product);

      return {
        ...saveProduct,
        owner: plainToInstance(SerializedUser, saveProduct.owner),
      };
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'Uh-oh! We hit a snag creating your product!',
      );
    }
  }

  async editProduct(id: number, editProductDto: EditProductDto) {
    try {
      const product = await this.findOneByCustomQuery({
        where: { id },
        relations: { basketProducts: true },
      });

      if (!product) throw new NotFoundException('Product not found!');
      await this.productRepository.save({ ...product, ...editProductDto });

      return { message: 'Product edited successfuly', product: { id } };
    } catch (error) {
      if (!error.response)
        throw new InternalServerErrorException(
          'Uh-oh! We hit a snag editing your product!',
        );
      throw error;
    }
  }

  async deleteProduct(id: number) {
    try {
      const product = await this.findOne(id);
      if (!product) throw new NotFoundException('Product not found!');

      await this.productRepository.remove(product);

      return { message: 'Product deleted successfuly', product: { id } };
    } catch (error) {
      if (!error.response)
        throw new InternalServerErrorException(
          'Uh-oh! We hit a snag deleting your product!',
        );
      throw error;
    }
  }

  searchProduct(value: string) {
    try {
      return this.productRepository.find({
        where: { name: Like(`%${value}%`) },
      });
    } catch (error) {
      console.log('Error in search products ' + error);
      throw new InternalServerErrorException(
        'Uh-oh! We hit a snag searching on products!',
      );
    }
  }
}
