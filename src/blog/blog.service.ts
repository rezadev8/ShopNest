import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Post } from './entities/posts';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { UserService } from 'src/users/users.service';
import { userInterface } from 'src/users/types/user';
import { EditPostDto } from './dtos/edit-post.dto';
import { SearchBlogDto } from './dtos/search-post.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private readonly userService: UserService,
  ) {}

  async findAll(skip: number, take: number) {
    try {
      const [entities, total] = await this.postRepository.findAndCount({
        relations: { author: true },
        select: { author: { username: true } },
        skip: Number(skip) || 0,
        take: Number(take) || 30,
      });

      return { posts: entities, total };
    } catch (error) {
      throw new InternalServerErrorException(
        'Unfortunately, there was an issue on getting posts!',
      );
    }
  }

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
          'Uh-oh! We hit a snag on deleting post!',
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
          'Uh-oh! We hit a snag on editing post!',
        );
      else throw error;
    }
  }

  async searchInBlog(searchBlogDto: SearchBlogDto) {
    const { keyword = '', title = '' } = searchBlogDto;

    try {
      const posts = await this.postRepository.find({
        where: [
          { keyword: keyword ? Like(`%${keyword}%`) : null },
          { title: title ? Like(`%${title}%`) : null },
        ],
      });

      return posts;
    } catch (error) {
      throw new InternalServerErrorException(
        'Uh-oh! We hit a snag on searching post!',
      );
    }
  }
}
