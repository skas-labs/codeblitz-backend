import { EntityRepository, ILike, Repository } from 'typeorm';
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

  async findByUsername(username: string): Promise<Player[]> {
    const players = await super.find({
      where: {
        username: ILike(`%${username}%`)
      }
    })
    if (!players || players.length < 1) throw new PlayerNotFoundError()
    return players
  }

  async findByName(name: string): Promise<Player[]> {
    const players = await super.find({
      where: {
        name: ILike(`%${name}%`)
      }
    })
    if (!players || players.length < 1) throw new PlayerNotFoundError()
    return players
  }
}
