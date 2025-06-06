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
  HttpCode,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from 'src/auth/jwt/guards/auth.guard';
import { Roles } from 'src/auth/jwt/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { userInterface } from 'src/users/types/user';
import { EditPostDto } from './dtos/edit-post.dto';
import { SearchBlogDto } from './dtos/search-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostSwagger, DeletePostSwagger, EditPostSwagger, GetPostsSwagger, SearchInBlogSwagger } from './decorators/blog.swagger.decorator';
import { Throttle } from '@nestjs/throttler';

@Throttle({default:{ttl:60000 , limit:50}})
@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @GetPostsSwagger()
  @Get('/')
  getPost(@Query() query: { skip: number; take: number }) {
    const { skip, take } = query;
    return this.blogService.findAll(skip, take);
  }

  @CreatePostSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('post')
  createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() currentUser: userInterface,
  ) {
    return this.blogService.handleCreatePost(createPostDto, currentUser);
  }

  @DeletePostSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Delete(':id/post')
  deletePost(@Param() { id }) {
    return this.blogService.deletePost(id);
  }

  @EditPostSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch('/:id/post')
  editPost(@Param() { id }, @Body() editPostDto: EditPostDto) {
    return this.blogService.editPost(editPostDto, id);
  }

  @SearchInBlogSwagger()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('search')
  searchInBlog(@Body() searchBlogDto: SearchBlogDto) {
    return this.blogService.searchInBlog(searchBlogDto);
  }
}
