import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../database.provider';
import { User } from '@codeblitz/data/dist/entities/User';
import { UserRepository } from '@codeblitz/data/dist/repositories/UserRepository';

@Injectable()
export class UsersService {
  @Inject() private readonly database!: Database;

  #repo?: UserRepository;
  get repo(): UserRepository {
    if (this.#repo == null) this.#repo = this.database.repos.user;
    return this.#repo;
  }

  async findById(id: number): Promise<User> {
    return await this.repo.findById(id);
  }

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

}
