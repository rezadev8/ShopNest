import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockSerializedUser,
  mockUser,
  mockUsersService,
} from '../../test/mocks/users/users.mock';
import { BlogService } from './blog.service';
import { Post } from './entities/posts';
import {
  createPostDto,
  mockPost,
  mockPostRepository,
} from '../../test/mocks/blog/blog.mock';
import { UserService } from 'src/users/users.service';

describe('UsersService', () => {
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository,
        },
        {
          provide: UserService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should find posts by prop', async () => {
    expect(await service.findAll(1, 1)).toEqual({
      posts: [mockPost],
      total: 1,
    });
  });

  it('Should get one post', async () => {
    expect(await service.findOnePost(1)).toEqual(mockPost);
  });

  it('Should create post', async () => {
    const result = await service.handleCreatePost(createPostDto, mockUser);
    expect(result).toEqual({ ...mockPost, author: mockSerializedUser });
    expect(mockUsersService.findOne).toHaveBeenCalled();
    expect(mockPostRepository.save).toHaveBeenCalled();
  });

  it('Should delete post', async () => {
    expect(await service.deletePost(1)).toEqual({
      message: 'Post deleted successfully!',
      post: { id: 1 },
    });
  });

  it('Should edit post', async () => {
    expect(await service.editPost(createPostDto, 1)).toEqual({
      message: 'Post edited successfully',
      post: { id: 1 },
    });
  });

  it('Should search in posts and return result', async () => {
    expect(await service.searchInBlog({ keyword: '', title: '' })).toEqual([
      mockPost,
    ]);
  });
});
