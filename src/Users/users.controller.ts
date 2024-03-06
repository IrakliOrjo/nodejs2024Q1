import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  getUser() {
    return this.userService.getUsers();
  }

  @Get(':id')
  findOne(@Param() params: any, @Res() res: Response): any {
    return this.userService.findUser(params.id);
  }
}
