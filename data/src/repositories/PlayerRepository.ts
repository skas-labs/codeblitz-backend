import { EntityRepository, Repository } from 'typeorm';
import { Player } from '../entities/Player';

class PlayerNotFoundError extends Error {
  name = 'ERR_PLAYER_NOT_FOUND';
}

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> {

  async findById(id: number): Promise<Player> {
    const player = await super.findOne(id);
    if (!player) throw new PlayerNotFoundError();
    return player;
  }
}
