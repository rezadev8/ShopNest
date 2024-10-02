import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { encodePassword } from 'src/utils/bcrypt';
import { plainToClass } from 'class-transformer';
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

      return {
        user: plainToClass(SerializedUser, saveUser),
        msg: 'User create successfuly ;)',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Unfortunately, there was an issue creating your account!")
    }
  }

  findOne(id:number){
    return  this.userRepository.findOneBy({id});
  }

  async findOneByUserName(username: any) {
    if(!username) return null;

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
    return await this.userRepository.findOne(props)
  }
}
