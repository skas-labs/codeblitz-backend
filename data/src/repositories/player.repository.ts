import { AbstractRepository, DeepPartial, EntityRepository, ILike, Repository } from 'typeorm';
import { Player } from '../entities/player.entity';
import { Follow } from '../entities/follow.entity';
import { User } from '../entities/user.entity';

class PlayerNotFoundError extends Error {
  name = 'ERR_PLAYER_NOT_FOUND';
}

class PlayerFollowError extends Error {
  name = 'ERR_PLAYER_FOLLOW';
}

@EntityRepository(Player)
export class PlayerRepository extends AbstractRepository<Player> {
  get followRepo(): Repository<Follow> {
    return this.repository.manager.getRepository(Follow)
  }


  async createPlayer(player: DeepPartial<Player>): Promise<Player> {
    // TODO: check if player exists, and userame is valid
    return this.repository.save(player);
  }

  async findById(id: number): Promise<Player> {
    const player = await this.repository.findOne(id);
    if (!player) throw new PlayerNotFoundError();
    return player;
  }

  async findByUser(user: User): Promise<Player> {
    const player = await this.repository.findOne({
      where: { user }
    })
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

  async findFollowers(player: Player): Promise<Player[]> {
    // TODO: add pagniation options in future
    const follows = await this.followRepo.find({
      where: { followee: player }
    })
    return follows.map( f => f.follower )
  }

  async findFollowing(player: Player): Promise<Player[]> {
    // TODO: add pagniation options in future
    const follows = await this.followRepo.find({
      where: { follower: player }
    })
    return follows.map( f => f.followee )
  }

  async followPlayer(follower: Player, followee: Player): Promise<Follow> {

    const existingFollow = await this.followRepo.findOne({
      where: { follower, followee }
    })

    if (existingFollow) throw new PlayerNotFoundError(
      `${follower.username} already follows ${followee.username}`
    )

    const follow = await this.followRepo.save({followee, follower})

    return follow;

  }

  async findAll(): Promise<Player[]> {
    // TODO : handle pagination
    return await this.repository.find();
  }

}
