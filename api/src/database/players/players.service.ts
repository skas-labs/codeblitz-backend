import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../database.provider';
import { Player } from '@codeblitz/data/dist/entities/Player';

@Injectable()
export class PlayersService {
  @Inject() private readonly database!: Database

  get repo() { return this.database.repos.player }

  async findById(id: number): Promise<Player> {
    return await this.repo.findById(id)
  }

}
