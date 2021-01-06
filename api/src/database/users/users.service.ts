import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../database.provider';
import { User } from '@codeblitz/data/dist/entities/User';

@Injectable()
export class UsersService {
  @Inject() private readonly database!: Database

  get repo() { return this.database.repos.user }

}
