import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Patch,
  Get,
  Query,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { BlogService } from './blog.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { userInterface } from 'src/users/types/user';
import { EditPostDto } from './dtos/edit-post.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/')
  getPost(@Query() query:{skip:number , take:number}){
    const {skip , take} = query;
    return this.blogService.findAll(skip , take)
  }

  @Roles(Role.ADNIM)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Post('post')
  createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() currentUser: userInterface,
  ) {
    return this.blogService.handleCreatePost(createPostDto, currentUser);
  }

  @Roles(Role.ADNIM)
  @UseGuards(AuthGuard)
  @Delete('post/:id')
  deletePost(@Param() { id }) {
    return this.blogService.deletePost(id);
  }

  @Roles(Role.ADNIM)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Patch('post/:id')
  editPost(@Param() { id }, @Body() editPostDto: EditPostDto) {
    return this.blogService.editPost(editPostDto, id);
  }
}
