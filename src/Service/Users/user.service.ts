import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { Users } from 'src/db/db';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/models/userModel';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

@Injectable()
export class UserService {
  userVersion = 1;

  getUsers() {
    return Users;
  }

  createUser(dto: CreateUserDto) {
    const user: User = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    Users.push(user);
    this.userVersion++;

    return user;
  }

  findUser(id) {
    const user = Users.find((user) => user.id === id);
    if (user) {
      const { password, ...rest } = user;
      return rest;
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  updatePassword(id: string, dto: UpdatePasswordDto) {
    const profile = Users.find((user) => user.id === id);

    if (!profile) {
      throw new NotFoundException('user not found');
    }
    const passwordsMatch = profile.password === dto.oldPassword;
    if (!passwordsMatch) {
      throw new HttpException(
        'Old password doesnt match',
        HttpStatus.FORBIDDEN,
      );
    }
    //update version, update time, password
    profile.version = profile.version + 1;
    profile.updatedAt = new Date().getTime();
    profile.password = dto.newPassword;
    //filter data without password and send
    const { password, ...rest } = profile;
    return rest;
  }
  deleteUser(id: string) {
    const foundUser = Users.find((user) => user.id === id);
    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const indexOfUser = Users.indexOf(foundUser);
    Users.splice(indexOfUser, 1);
    return 'done';
  }
}
