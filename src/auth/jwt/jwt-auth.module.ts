import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { UserModule } from '../../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthController } from './jwt-auth.controller';
import { DuplicateUserMiddleware } from 'src/users/middlewares/duplicate-user/duplicate-user.middleware';
import { jwtConstants } from '../constants';
import { JwtAuthGuard } from './guards/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    // JwtModule.register({
    //   global: true,
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '30d' },
    // }),

    UserModule
  ],
  providers: [JwtAuthService , JwtAuthGuard],
  controllers: [JwtAuthController],
  exports: [JwtAuthService , JwtAuthGuard],
})
export class JwtAuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DuplicateUserMiddleware).forRoutes('/auth/jwt/signup');
  }
}