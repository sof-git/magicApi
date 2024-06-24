import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { Role } from '../role/role.enum';
import { Roles } from '../role/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  //@Roles(Role.ADMIN)
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Get(':username')
  findUserByUsername(@Param('username') username: string) {
    return this.userService.findUserByUsername(username);
  }

  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Put(':username')
  @Roles(Role.ADMIN)
  updateUser(@Param('username') username: string, @Body() user: UserDto) {
    return this.userService.updateUserByUsername(username, user);
  }

  @Delete(':username')
  @Roles(Role.ADMIN)
  deleteUser(@Param('username') username: string) {
    return this.userService.deleteUserByUsername(username);
  }
}
