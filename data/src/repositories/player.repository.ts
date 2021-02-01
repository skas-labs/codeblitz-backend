import { AbstractRepository, DeepPartial, EntityRepository, ILike } from 'typeorm';
import { Player } from '../entities/player.entity';

class PlayerNotFoundError extends Error {
  name = 'ERR_PLAYER_NOT_FOUND';
}

class PlayerFollowError extends Error {
  name = 'ERR_PLAYER_FOLLOW';
}

@EntityRepository(Player)
export class PlayerRepository extends AbstractRepository<Player> {

  async createPlayer(player: DeepPartial<Player>): Promise<Player> {
    // TODO: check if player exists, and userame is valid
    return this.repository.save(player);
  }

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

  async followPlayer(follower: Player, followee: Player): Promise<boolean> {

    const existingFollower = await this.repository.findOne(follower.id)

    if (!existingFollower) throw new PlayerFollowError(`Follower ${ follower.id } doesn't exist`);

    await this.repository.createQueryBuilder()
      .relation(Player, 'following')
      .of(existingFollower)
      .add(followee);

    return true;

  }

  async findAll(eagerLoadFollows = false): Promise<Player[]> {
    // TODO : handle pagination
    return await this.repository.find({
      relations: (eagerLoadFollows ? [ 'following', 'followers' ] : [])
    });
  }

}
