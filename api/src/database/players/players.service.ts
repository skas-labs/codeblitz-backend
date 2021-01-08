import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../database.provider';
import { Player } from '@codeblitz/data/dist/entities/Player';
import { PlayerRepository } from '@codeblitz/data/dist/repositories/PlayerRepository';

interface SearchOptions {
  username?: string
  name?: string
}

@Injectable()
export class PlayersService {
  @Inject() private readonly database!: Database;

  #repo?: PlayerRepository;
  get repo() {
    if (this.#repo == null) this.#repo = this.database.repos.player;
    return this.#repo;
  }

  async search(searchOptions: SearchOptions): Promise<Player[]> {
    if (searchOptions.username) return this.repo.findByUsername(searchOptions.username)
    if (searchOptions.name) return this.repo.findByName(searchOptions.name)

    // if no options, find all players
    return this.repo.find()
  }

  async findById(id: number): Promise<Player> {
    return await this.repo.findById(id);
  }

}