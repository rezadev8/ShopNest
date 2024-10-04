import { Injectable} from '@nestjs/common';
import { Post } from './entities/posts';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async handleCreatePost(createPostDto:CreatePostDto) {
    // return await this.postRepository.save({...createPostDto , author});


  }
}
