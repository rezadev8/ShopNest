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

export const mockBlogRepository = {
  findAndCount: jest.fn().mockReturnValue([mockPost, 1]),
};
