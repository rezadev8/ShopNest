import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/posts';
import { User } from 'src/users/entities/users.entity';
import { UserService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post , User])],
  controllers: [BlogController],
  providers: [BlogService , UserService],
})
export class BlogModule {}
