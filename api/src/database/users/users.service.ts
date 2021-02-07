import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../database.provider';
import { User } from '@codeblitz/data/dist/entities/user.entity';
import { UserRepository } from '@codeblitz/data/dist/repositories/user.repository';
import { Lazy } from '../../utils/lazy.decorator';
import { AuthtokenRepository } from '@codeblitz/data/dist/repositories/authtoken.repository';

@Injectable()
export class UsersService {
  @Inject() private readonly database!: Database;

  @Lazy<UsersService>(c => c.database.repos.user)
  private repo!: UserRepository;

  @Lazy<UsersService>(c => c.database.repos.auth)
  private authRepo!: AuthtokenRepository;

  async findByAuthToken(token: string): Promise<User> {
    return await this.authRepo.validateToken(token)
  }

  async findById(id: number): Promise<User> {
    return await this.repo.findById(id);
  }

  async findAll(): Promise<User[]> {
    return await this.repo.findAll();
  }

}
