import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/models/userModel';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        login: dto.login,
        password: dto.password,
      },
    });

    const newUser = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
    return newUser;
  }

  async findUser(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (user) {
      delete user.password;
      return user;
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  async updatePassword(userId: string, dto: UpdatePasswordDto) {
    const profile = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

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
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: dto.newPassword,
        version: { increment: 1 },
      },
    });
    //i send this as a new object, to turn the date to number to tests dont complain
    const changedPassUser = {
      id: updatedUser.id,
      login: updatedUser.login,
      version: updatedUser.version,
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
    };
    return changedPassUser;
  }
  async deleteUser(userId: string) {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return true;
  }
}
