import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../database.provider';
import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { PlayerRepository } from '@codeblitz/data/dist/repositories/player.repository';
import { Lazy } from '../../utils/lazy.decorator';
import { User } from '@codeblitz/data/dist/entities/user.entity';

interface SearchOptions {
  username?: string
  name?: string
}

@Injectable()
export class PlayersService {
  @Inject() private readonly database!: Database;

  @Lazy<PlayersService>(c => c.database.repos.player)
  private repo!: PlayerRepository;

  async search(searchOptions: SearchOptions): Promise<Player[]> {
    if (searchOptions.username) return this.repo.findByUsername(searchOptions.username);
    if (searchOptions.name) return this.repo.findByName(searchOptions.name);

    // if no options, find all players
    return this.repo.findAll();
  }

  async findByUser(user: User): Promise<Player> {
    return await this.repo.findByUser(user)
  }

  async findById(id: number): Promise<Player> {
    return await this.repo.findById(id);
  }

  async findFollowers(player: Player): Promise<Player[]>
  async findFollowers(playerId: number): Promise<Player[]>
  async findFollowers(p: Player | number): Promise<Player[]> {
    let player: Player
    if (typeof p === 'number') player = await this.findById(p)
    else player = p
    return await this.repo.findFollowers(player)
  }

  async findFollowing(playerId: number): Promise<Player[]>
  async findFollowing(player: Player): Promise<Player[]>
  async findFollowing(p: Player | number): Promise<Player[]> {
    let player: Player
    if (typeof p === 'number') player = await this.findById(p)
    else player = p
    return await this.repo.findFollowing(player)
  }

}