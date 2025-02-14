import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { mockSerializedUser, mockUser } from '../../test/mocks/users/users.mock';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findOne: jest.fn(),
    getUsers: jest.fn(),
    deleteUser: jest.fn(),
  };

  let req = {
    user: {
      id: 1,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUsersService)
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Getting user', () => {
    it('Should get a user', async () => {
      mockUsersService.findOne.mockReturnValueOnce(mockUser);
      const result = await controller.getUser(req);
      expect(result).toEqual(mockSerializedUser);
    });

    it('Should get not found exception', async () => {
      mockUsersService.findOne.mockRejectedValue(
        new NotFoundException('User not found!'),
      );

      await expect(controller.getUser(req)).rejects.toThrow(NotFoundException);
    });
  });

  describe('Getting all users', () => {
    it('Should return all users', async () => {
      mockUsersService.getUsers.mockReturnValue([
        mockSerializedUser
      ]);
      const query = { skip: 20, take: 2 };
      const result = await controller.getUsers(query);

      expect(result).toEqual(expect.any(Array));
    });
  });

  describe('Deleting user', () => {
    it('Should delete user successfully', async () => {
      mockUsersService.deleteUser.mockReturnValue({
        message: 'User deleted successfully!',
        user: { id: 1 },
      });
      const result = await controller.deleteUser({ id: 1 });

      expect(result).toEqual({
        message: 'User deleted successfully!',
        user: { id: expect.any(Number) },
      });
    });
  });

  describe('Get user by id', () => {
    it('Should return user', async () => {
      mockUsersService.findOne.mockReturnValue(mockUser);
      const result = await controller.getUser(req);

      expect(result).toEqual(mockSerializedUser);
    });
  });
});
