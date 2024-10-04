import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { BlogService } from './blog.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService:BlogService){}

    @Roles(Role.ADNIM)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('/create')
    createPost(@Body() createPostDto:CreatePostDto){
        return this.blogService.handleCreatePost(createPostDto)
    }
}
