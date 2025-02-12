import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Equal, Repository } from 'typeorm';
import { encodePassword } from 'src/utils/bcrypt';
import {  plainToInstance } from 'class-transformer';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { SerializedUser } from './types/serializedUser';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create({
        phone: +createUserDto.phone,
        email: createUserDto.email,
        password: createUserDto.password,
      });

      newUser.password = await encodePassword(newUser.password);
      const saveUser = await this.userRepository.save(newUser);

      return plainToInstance(SerializedUser, saveUser)
      
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Unfortunately, there was an issue on creating your account!',
      );
    }
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id:Equal(id) });
  }

  async findOneByUserName(username: any) {
    if (!username) return null;

    return await this.userRepository.findOne({
      where: [
        {
          email: username,
        },
        { phone: username },
      ],
    });
  }

  async findUserByProperties(props: any) {
    return await this.userRepository.findOne(props);
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['products', 'posts'],
      });
      if (!user) throw new NotFoundException('User not found!');

      await this.userRepository.remove(user);

      return { message: 'User deleted successfully!', user: { id } };
    } catch (error) {
      console.log(error);
      if (!error.response)
        throw new InternalServerErrorException(
          'Unfortunately, there was an issue on deleting user!',
        );
      else throw error;
    }
  }

  async getUsers({ skip, take }: { skip?: number; take?: number }) {
    try {
      const [entities , total] = await this.userRepository.findAndCount({
        skip: Number(skip) || 0,
        take: Number(take) || 30,
      });

      return {users:plainToInstance(SerializedUser,entities) , total}
    } catch (error) {
      throw new InternalServerErrorException(
        'Unfortunately, there was an issue on getting users!',
      );
    }
  }
}
