import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/models/userModel';
import { validate as uuidValidate } from 'uuid';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  getUser() {
    const users: User[] = this.userService.getUsers();
    const filteredUsers = users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
    return filteredUsers;
  }

  @Get(':id')
  findOne(@Param() params: any): any {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.userService.findUser(params.id);
  }
  @Post('/')
  @HttpCode(201)
  createUser(@Body() dto: CreateUserDto) {
    console.log(dto, 'params');
    const createdUser = this.userService.createUser(dto);
    const { password, ...rest } = createdUser;
    return rest;
  }
  @Put(':id')
  updatePassword(@Param() params: any, @Body() dto: UpdatePasswordDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.userService.updatePassword(params.id, dto);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param() params: any) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.userService.deleteUser(params.id);
  }
}
