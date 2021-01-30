import { AbstractRepository, EntityRepository, ILike } from 'typeorm';
import { Player } from '../entities/player.entity';

class PlayerNotFoundError extends Error {
  name = 'ERR_PLAYER_NOT_FOUND';
}

@EntityRepository(Player)
export class PlayerRepository extends AbstractRepository<Player> {

  async findById(id: number): Promise<Player> {
    const player = await this.repository.findOne(id);
    if (!player) throw new PlayerNotFoundError();
    return player;
  }

  async findByUsername(username: string): Promise<Player[]> {
    const players = await this.repository.find({
      where: {
        username: ILike(`%${ username }%`)
      }
    });
    if (!players || players.length < 1) throw new PlayerNotFoundError();
    return players;
  }

  async findByName(name: string): Promise<Player[]> {
    const players = await this.repository.find({
      where: {
        name: ILike(`%${ name }%`)
      }
    });
    if (!players || players.length < 1) throw new PlayerNotFoundError();
    return players;
  }

  async findAll(): Promise<Player[]> {
    // TODO : handle pagination
    return await this.repository.find()
  }

}
