import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { UserModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthController } from './jwt/jwt-auth.controller';
import { jwtConstants } from './constants';
import { DuplicateUserMiddleware } from 'src/users/middlewares/duplicate-user/duplicate-user.middleware';
import { JwtAuthModule } from './jwt/jwt-auth.module';

@Module({
  imports: [JwtAuthModule],
})
export class AuthModule {}
