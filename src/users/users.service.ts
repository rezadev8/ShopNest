import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { encodePassword } from 'src/utils/bcrypt';
import { plainToClass } from 'class-transformer';
import { SerializedUser } from './types';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create({
        phone: +createUserDto.phone,
        email: createUserDto.email,
        password: createUserDto.password,
      });

      newUser.password = await encodePassword(newUser.password);
      const saveUser = await this.usersRepository.save(newUser);

      return {
        user: plainToClass(SerializedUser, saveUser),
        msg: 'با موفقیت ثبت نام شدی :)',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('متاستفانه مشکلی در هنگام ساخت حساب کاربریت به وجود اومده!')
    }
  }

  async findOne(username: any) {
    if(!username) return null;

    return await this.usersRepository.findOne({
      where: [
        {
          email: username,
        },
        { phone: username },
      ],
    });
  }

  async findUserByProperties(props: any) {
    return await this.usersRepository.findOne(props)
  }
}
