import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService){}

    @Post('/sign-up')
    @UsePipes(new ValidationPipe())
    signUp(@Body() createUserDto){
        
    }
}
