import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { BlogService } from './blog.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { userInterface } from 'src/users/types/user';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Roles(Role.ADNIM)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('post')
  createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() currentUser: userInterface,
  ) {
    return this.blogService.handleCreatePost(createPostDto, currentUser);
  }

  @Delete('post/:id')
  deletePost(@Param() {id}){
    return this.blogService.deletePost(id)
  }
}
