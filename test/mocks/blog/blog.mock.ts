export const mockPost = {
  id: 1,
  title: 'Hello world?',
  content: 'Are you the world or me?',
  thumbnail: '/world.png',
  keyword: 'me , world',
  createdAt: '2024-10-05T09:26:14.403Z',
  updatedAt: '2024-10-05T10:25:25.000Z',
  author: {
    id: 1,
    email: 'rezabahmani.dev@gmail.com',
    name: 'Reza',
    phone: 9123456789,
    createdAt: '2024-10-05T09:24:41.383Z',
    updatedAt: '2024-10-05T11:03:20.562Z',
  },
};

export const mockPostRepository = {
  findAndCount: jest.fn().mockReturnValue([[mockPost], 1]),
  findOnePost: jest
    .fn()
    .mockReturnValue({ ...mockPost, author: { name: mockPost.author.name } }),
  save: jest.fn().mockReturnValue(mockPost),
  remove: jest.fn(),
  find: jest.fn().mockReturnValue([mockPost]),
  findOneBy:jest.fn().mockReturnValue(mockPost)
};

export const createPostDto = {
  title: 'Hello world',
  content: 'Are you the world or me?',
  thumbnail: '/world.png',
  keyword: 'me , world',
};
