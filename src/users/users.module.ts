import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UsersController],
  exports:[UserService]
})
export class UserModule {}
