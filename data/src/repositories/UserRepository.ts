import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

class UserNotFoundError extends Error {
  name = 'ERR_USER_NOT_FOUND'
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async findById(id: number): Promise<User> {
    const user = await super.findOne(id)
    if (!user) throw new UserNotFoundError()
    return user
  }
}
