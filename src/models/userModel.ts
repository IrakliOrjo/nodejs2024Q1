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
  login: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password
  @IsString()
  @IsNotEmpty()
  newPassword: string; // new password
}
