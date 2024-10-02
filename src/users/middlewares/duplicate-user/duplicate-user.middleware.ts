import {
  HttpException,
  Injectable,
  NestMiddleware,
  Request,
  Response,
} from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { IsNull } from 'typeorm';

@Injectable()
export class DuplicateUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UserService) {}
  async use(@Request() req, @Response() res, next: () => void) {
    const {phone , email} = req.body;
    const findUser = await this.usersService.findUserByProperties({
      where: [{phone:phone ? phone : IsNull()} , {email:email ? email : IsNull()}],
    });

    if (findUser) {
      throw new HttpException("A user with these details already exists!", 409);
    } else {
      next()
    }
  }
}
