import { Injectable, Post } from '@nestjs/common';
import { Users } from 'src/db/db';

@Injectable()
export class UserService {
  constructor() {}

  getUsers() {
    return Users;
  }

  findUser(id) {
    if (typeof id !== 'string') {
      return '400';
    }
    let user = Users.find((user) => user.id === id);
    if (user) {
      return user;
    } else {
      return '404';
    }
  }
}
