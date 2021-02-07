import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../database.provider';
import { User } from '@codeblitz/data/dist/entities/user.entity';
import { UserRepository } from '@codeblitz/data/dist/repositories/user.repository';
import { Lazy } from '../../utils/lazy.decorator';

@Injectable()
export class UsersService {
  @Inject() private readonly database!: Database;

  @Lazy<UsersService>(c => c.database.repos.user)
  private repo!: UserRepository;

  async findById(id: number): Promise<User> {
    return await this.repo.findById(id);
  }

  async findAll(): Promise<User[]> {
    return await this.repo.findAll();
  }

}
