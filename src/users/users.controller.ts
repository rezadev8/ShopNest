import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
    constructor(private usersService:UserService){}

    @Roles(Role.ADNIM)
    @UseGuards(AuthGuard)
    @Delete('/:id')
    deleteUser(@Param(){id}){
        return this.usersService.deleteUser(id)
    }
}
