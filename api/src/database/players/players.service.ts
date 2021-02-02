import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../database.provider';
import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { PlayerRepository } from '@codeblitz/data/dist/repositories/player.repository';

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
    return this.repo.findAll()
  }

  async findById(id: number): Promise<Player> {
    return await this.repo.findById(id);
  }

  async findFollowers(id: number): Promise<Player[]> {
    // const player = await this.repo.findById(id)
    // return await player.followers
    return []
  }

  async findFollowing(id: number): Promise<Player[]> {
    // const player = await this.repo.findById(id)
    // return await player.following
    return []
  }

}