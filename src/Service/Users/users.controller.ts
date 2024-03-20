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
  async getUser() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async findOne(@Param() params: any) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.userService.findUser(params.id);
  }
  @Post('/')
  @HttpCode(201)
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }
  @Put(':id')
  async updatePassword(@Param() params: any, @Body() dto: UpdatePasswordDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.userService.updatePassword(params.id, dto);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param() params: any) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.userService.deleteUser(params.id);
  }
}
