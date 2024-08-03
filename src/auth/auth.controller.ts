import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/sign-in.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signIn(@Body() signInDto: LoginDto) {
    const result = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );

    return result;
  }
}
