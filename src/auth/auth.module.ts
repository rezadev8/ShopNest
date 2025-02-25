import { Module } from '@nestjs/common';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { GoogleOauthModule } from './google-oauth/google-oauth.module';

@Module({
  imports: [JwtAuthModule , GoogleOauthModule],
  exports:[JwtAuthModule]
})
export class AuthModule {}


