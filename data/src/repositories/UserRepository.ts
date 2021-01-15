import { AbstractRepository, EntityRepository } from 'typeorm';
import { User } from '../entities/User';

class UserNotFoundError extends Error {
  name = 'ERR_USER_NOT_FOUND';
}

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {

  async findById(id: number): Promise<User> {
    const user = await this.repository.findOne(id);
    if (!user) throw new UserNotFoundError();
    return user;
  }

  async findAll(): Promise<User[]> {
    // TODO: handle pagination
    return await this.repository.find()
  }
}
