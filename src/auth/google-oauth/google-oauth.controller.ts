import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GoogleOauthService } from './google-oauth.service';
import { UserService } from 'src/users/users.service';
import { Provider } from '../enums/provider.enum';

@Controller('auth/google')
export class GoogleOauthController {
    constructor(private googleOauthService: GoogleOauthService, private userService: UserService) { }

    @Get()
    redirectToGoogle(@Res() res: Response) {
        const authUrl = this.googleOauthService.getGoogleAuthUrl();
        res.redirect(authUrl);
    }

    @Get('callback')
    async googleCallback(@Query('code') code: string, @Res() res: Response) {
        const tokens = await this.googleOauthService.getGoogleTokens(code);
        const { access_token } = tokens;

        const { email, name } = await this.googleOauthService.getGoogleUserInfo(access_token);

        let user: any = await this.userService.findOneByUserName(email);

        if (!user) {
            const userDto = { email, provider: Provider.GOOGLE, name, password: null , phone:null };

            user = await this.userService.createUser(userDto)
        }

        const token = await this.googleOauthService.generateTokens({ id: user.id, email: user.email, role: user.role });

        res.redirect(`${process.env.CLIENT_URL}/google/callback?token=${token}`);
    }
}