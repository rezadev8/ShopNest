import { Module } from '@nestjs/common';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { GoogleOauthModule } from './google-oauth/google-oauth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    global: true,
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('jwt.secret'),
      signOptions: {
        expiresIn: configService.get<string>('jwt.expiresIn')
      }
    }),
    inject: [ConfigService],
  },
  ), JwtAuthModule, GoogleOauthModule],
  exports: [JwtAuthModule]
})
export class AuthModule { }


