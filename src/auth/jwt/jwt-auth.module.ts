import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { UserModule } from '../../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthController } from './jwt-auth.controller';
import { jwtConstants } from '../constants';
import { DuplicateUserMiddleware } from 'src/users/middlewares/duplicate-user/duplicate-user.middleware';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [JwtAuthService],
  controllers: [JwtAuthController],
  exports: [JwtAuthService],
})
export class JwtAuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DuplicateUserMiddleware)
      .forRoutes('/auth/signup')
  }
}
