import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { LoginDto } from './dtos/sign-in.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInSwagger, SignUpSwagger } from './decorators/auth.swagger';
import { Throttle } from '@nestjs/throttler';

@Throttle({default:{ttl:60000 , limit:3}})
@ApiTags('Auth')
@Controller('auth/jwt')
export class JwtAuthController {
  constructor(private authService: JwtAuthService) {}

  @SignUpSwagger()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('signup')
  signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }


  @SignInSwagger()
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('login')
  async signIn(@Body() signInDto: LoginDto) {
    const result = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );

    return result;
  }
}
