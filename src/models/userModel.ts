import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: ReturnType<typeof uuidv4>; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  login: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  oldPassword: string; // previous password
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  newPassword: string; // new password
}
