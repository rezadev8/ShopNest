import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { createPostDto, mockPost } from '../../test/mocks/blog/blog.mock';

describe('BlogController', () => {
  let controller: BlogController;

  const mockBlogService = {
    findAll: jest.fn().mockReturnValue({ posts: [mockPost], total: 1 }),
    handleCreatePost: jest.fn().mockReturnValue(mockPost),
    deletePost: jest.fn().mockReturnValue({
      message: 'Post deleted successfully!',
      post: { id: 1 },
    }),
    editPost: jest.fn().mockReturnValue({
      message: 'Post edited successfully',
      post: { id: 1 },
    }),
    searchInBlog: jest.fn().mockReturnValue([mockPost]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [BlogService],
    })
      .overrideProvider(BlogService)
      .useValue(mockBlogService)
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<BlogController>(BlogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return posts', () => {
    const query = { skip: 1, take: 1 };
    expect(controller.getPost(query)).toEqual({
      posts: expect.any(Array),
      total: expect.any(Number),
    });
  });

  it('Should create and return post', () => {
    const user = {
      id: 2,
      email: 'rezabahmani.dev@gmail.com',
      phone: 9123456789,
      password: '$2b$10$rdnBk.jmqishnrmddsoqceg5DsYjAB1YbFrVfNOa5ETs/vjcGHaom',
      createdAt: '2025-02-13T14:32:07.438Z',
      updatedAt: '2025-02-13T14:32:07.438Z',
    };

    expect(controller.createPost(createPostDto, user)).toEqual(mockPost);
    expect;
  });

  it('Should delete post', () => {
    expect(controller.deletePost({ id: 1 })).toEqual({
      message: 'Post deleted successfully!',
      post: { id: 1 },
    });
  });

  it('Should edit post', () => {
    const dto = {
      title: 'Both of you are the world',
      content: 'Are you serious?',
      thumbnail: 'Yes',
      keyword: 'Thanks',
    };
    expect(controller.editPost({ id: 1 }, dto)).toEqual({
      message: 'Post edited successfully',
      post: { id: 1 },
    });
  });

  it('Should return search result', () => {
    const dto = { title: 'Are', keyword: '' };
    expect(controller.searchInBlog(dto)).toEqual([mockPost]);
  });
});
