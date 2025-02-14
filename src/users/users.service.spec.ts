import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { NotFoundException } from '@nestjs/common';
import { mockUser, mockUsersRepository } from '../../test/mocks/users/users.mock';

describe('UsersService', () => {
  let service: UserService;

  const { password, role, ...serializedUser } = mockUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find user', () => {
    it('Should find one user', async () => {
      await expect(service.findOne(1)).resolves.toEqual(mockUser);
    });

    it('Should find one user by user name', async () => {
      expect(
        await service.findOneByUserName('rezabahmani.dev@gmail.com'),
      ).toEqual(mockUser);
    });

    it('Should find user by props', async () => {
      expect(
        await service.findOneByUserName({ email: 'rezabahmani.dev@gmail.com' }),
      ).toEqual(mockUser);
    });

    it('Should return users' , async ()  => {
        const query = {
            skip:20 , 
            take:1
        }

        expect(await service.getUsers(query)).toEqual({users:[serializedUser] , total:expect.any(Number)})
    })
  });

  describe('Creating user', () => {
    it('Should create user', async () => {
      const dto = {
        email: 'rezabahmani.dev@gmail.com',
        phone: 9123456789,
        password: 'As12345',
        name: 'Reza',
      };

      expect(await service.createUser(dto)).toEqual(serializedUser);
    });
  });

  describe('Delete user', () => {
    it('Should delete user', async () => {
      expect(await service.deleteUser(2)).toEqual({
        message: 'User deleted successfully!',
        user: { id: expect.any(Number) },
      });

      expect(mockUsersRepository.remove).toHaveBeenCalled()
    });

    it('Should got error in find user' , async () => {
        mockUsersRepository.findOne.mockRejectedValueOnce(new NotFoundException('User not found!'));
        
        expect(service.deleteUser(3)).rejects.toThrow(NotFoundException)
    })
  });
});
