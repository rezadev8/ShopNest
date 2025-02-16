import {
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteUserSwagger,
  GetAllUsersSwagger,
  GetUserByIdSwagger,
  GetUserSwagger,
} from './decorators/users.swagger.decorator';
import { UnauthorizedSwagger } from 'src/common/decorators/global.swagger.decorator';
import { plainToInstance } from 'class-transformer';
import { SerializedUser } from './types/serializedUser';
import { Throttle } from '@nestjs/throttler';

@Throttle({default:{ttl:60000 , limit:20}})
@ApiTags('User')
@UnauthorizedSwagger()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}

  @GetAllUsersSwagger()
  @Roles(Role.ADMIN)
  @Get()
  getUsers(@Query() query) {
    return this.usersService.getUsers(query);
  }

  @DeleteUserSwagger()
  @Roles(Role.ADMIN)
  @Delete('/:id')
  deleteUser(@Param() { id }) {
    return this.usersService.deleteUser(id);
  }

  @GetUserByIdSwagger()
  @Roles(Role.ADMIN)
  @Get('/:id/user')
  async getUserById(@Param() { id }) {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) throw new NotFoundException('User not found!');

      return plainToInstance(SerializedUser, user);
    } catch (error) {
      console.log(error);
      if (!error.response)
        throw new InternalServerErrorException(
          'Unfortunately, there was an issue on getting user!',
        );
      else throw error;
    }
  }

  @GetUserSwagger()
  @Get('/user')
  async getUser(@Req() req) {
    try {
      const user = await this.usersService.findOne(req.user?.id);
      if (!user) throw new NotFoundException('User not found!');

      return plainToInstance(SerializedUser, user);
    } catch (error) {
      console.log(error);
      if (!error.response)
        throw new InternalServerErrorException(
          'Unfortunately, there was an issue on getting user!',
        );
      else throw error;
    }
  }
}
