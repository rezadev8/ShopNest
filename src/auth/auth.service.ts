import {
    Body,
  Injectable,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  signUp(@Body() createUserdto: CreateUserDto) {
    return this.usersService.createUser(createUserdto);
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; msg: string }> {
    const user = await this.usersService.findOneByUserName(username);
    if (!user)
      throw new NotFoundException('عجیبه! با این مشخصات کاربری پیدا نکردم :(');
    const comparePasswordResult = await comparePassword(pass, user.password);

    if (!comparePasswordResult) {
      throw new UnauthorizedException('رمز عبورت درست نیست دوست من :!');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      msg: 'بفرماید اینم توکن شما ',
    };
  }
}
