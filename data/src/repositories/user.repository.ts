import { AbstractRepository, EntityRepository, Like } from 'typeorm';
import { User } from '../entities/user.entity';

class UserNotFoundError extends Error {
  name = 'ERR_USER_NOT_FOUND';
}
class UserCreateError extends Error {
  name = 'ERR_USER_CREATE'
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {

  async findById(id: number): Promise<User> {
    const user = await this.repository.findOne(id);
    if (!user) throw new UserNotFoundError();
    return user;
  }

  async findByPhNo(phno: string): Promise<User> {
    const user = await this.repository.findOne({where: {phoneNumber: Like(`%${ phno }%`)}});
    if (!user) throw new UserNotFoundError();
    return user;
  }

  async findAll(): Promise<User[]> {
    // TODO: handle pagination
    return await this.repository.find();
  }

  async createUser({email, phno}: { email?: string, phno?: string }): Promise<User> {
    if (!email && !phno) {
      throw new UserCreateError('Phone Number or Email is needed to create user')
    }

    const existing = await this.repository.findOne({
      where: [ {phoneNumber: phno}, /* or */ { email: email } ]
    })

    if (existing) {
      throw new UserCreateError('User with same email/phno exists')
    }

    const user = await this.repository.save({
      email: email,
      phoneNumber: phno,
    });

    return user
  }
}
