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
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; message: string }> {
    const user = await this.usersService.findOneByUserName(username);
    if (!user)
      throw new NotFoundException("Strange! Couldn't find a user with those details :(");
    const comparePasswordResult = await comparePassword(pass, user.password);

    if (!comparePasswordResult) {
      throw new UnauthorizedException("Your password’s not right, my friend! 😅");
    }

    const payload = { id: user.id, email: user.email , role:user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
      message: "Here you go, your token!",
    };
  }
}
