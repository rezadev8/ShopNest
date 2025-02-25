import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GoogleOauthService } from './google-oauth.service';
import { GoogleOauthController } from './google-oauth.controller';
import { jwtConstants } from '../constants';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthService],
})
export class GoogleOauthModule {}