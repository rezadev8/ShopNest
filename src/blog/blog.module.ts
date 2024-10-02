import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/posts';

@Module({
  imports:[TypeOrmModule.forFeature([Post])],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
