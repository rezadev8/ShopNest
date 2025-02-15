export const mockUser = {
  email: 'rezabahmani.dev@gmail.com',
  phone: 9123456789,
  password: '$2b$10$rdnBk.jmqishnrmddsoqceg5DsYjAB1YbFrVfNOa5ETs/vjcGHaom',
  name: 'Reza',
  id: 1,
  role: 'user',
  createdAt: '2025-02-13T14:32:07.438Z',
  updatedAt: '2025-02-13T14:32:07.438Z',
};

export const { role, password, ...mockSerializedUser } = mockUser;

export const mockUsersRepository = {
  findOneBy: jest.fn().mockResolvedValue(mockUser),
  create: jest.fn().mockReturnValue(mockUser),
  save: jest.fn().mockResolvedValue(mockUser),
  findOne: jest.fn().mockResolvedValue(mockUser),
  remove: jest.fn().mockResolvedValue({ ...mockUser, id: undefined }),
  findAndCount: jest.fn().mockResolvedValue([[mockUser], 1]),
};

export const mockUsersService = {
  findOne: jest.fn().mockReturnValue(mockUser),
  getUsers: jest.fn(),
  deleteUser: jest.fn(),
};
