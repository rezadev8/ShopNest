import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Post } from './entities/posts';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { UserService } from 'src/users/users.service';
import { userInterface } from 'src/users/types/user';
import { EditPostDto } from './dtos/edit-post.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private readonly userService: UserService,
  ) {}

  findOnePost(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async handleCreatePost(
    createPostDto: CreatePostDto,
    currentUser: userInterface,
  ) {
    try {
      const user = await this.userService.findOne(currentUser.id);

      return await this.postRepository.save({ ...createPostDto, author: user });
    } catch (error) {
      throw new InternalServerErrorException(
        'Unfortunately, there was an issue creating your post!',
      );
    }
  }

  async deletePost(postId: number) {
    try {
      const post = await this.findOnePost(postId);

      if (!post) throw new NotFoundException('Post not found!');
      await this.postRepository.remove(post);

      return { message: 'Post deleted successfuly!', post: { id: postId } };
    } catch (error) {
      if (!error?.response)
        throw new InternalServerErrorException(
          'Uh-oh! We hit a snag deleting post!',
        );
      throw error;
    }
  }

  async editPost(editPostDto: EditPostDto, postId: number) {
    try {
      const post = await this.findOnePost(postId);
      if (!post) throw new NotFoundException();

      await this.postRepository.save({ ...post, ...editPostDto });

      return { message: 'Post edited successfuly', post: { id: postId } };
    } catch (error) {
      if (!error?.response)
        throw new InternalServerErrorException(
          'Uh-oh! We hit a snag editing post!',
        );
      else throw error;
    }
  }
}
