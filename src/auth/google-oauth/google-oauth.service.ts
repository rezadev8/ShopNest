import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { Role } from '../enums/role.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleOauthService {
  constructor(private jwtService: JwtService, private readonly configService: ConfigService) { }
  private GOOGLE_OAUTH_CONFIG = {
    clientId: this.configService.get<string>('googleOauth.clientId'),
    clientSecret: this.configService.get<string>('googleOauth.clientSecret'),
    redirectUri: 'http://localhost:2006/auth/google/callback',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scope: 'profile email',
  }


  getGoogleAuthUrl(): string {
    const { clientId, redirectUri, authUrl, scope } = this.GOOGLE_OAUTH_CONFIG;
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope,
      access_type: 'offline',
    });
    return `${authUrl}?${params.toString()}`;
  }

  async getGoogleTokens(code: string) {
    const { clientId, clientSecret, redirectUri, tokenUrl } = this.GOOGLE_OAUTH_CONFIG;
    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );
    return response.data;
  }

  async getGoogleUserInfo(accessToken: string) {
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data;
  }

  async generateTokens(googleUser: any) {
    const payload = { id: googleUser.sub, email: googleUser.email, role: Role.USER };
    const token = this.jwtService.sign(payload, { expiresIn: '30d' });

    return token
  }
}