import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { DeleteUserSwagger, GetAllUsersSwagger } from './decorators/users.swagger.decorator';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}

  @GetAllUsersSwagger()
  @Roles(Role.ADNIM)
  @UseGuards(AuthGuard)
  @Get()
  getUsers(@Query() query) {
    return this.usersService.getUsers(query);
  }

  //! User not found
  @DeleteUserSwagger()
  @Roles(Role.ADNIM)
  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteUser(@Param() { id }) {
    return this.usersService.deleteUser(id);
  }
}
