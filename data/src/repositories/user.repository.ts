import { AbstractRepository, EntityRepository, Like } from 'typeorm';
import { User } from '../entities/user.entity';

class UserNotFoundError extends Error {
  name = 'ERR_USER_NOT_FOUND';
}

class UserCreateError extends Error {
  name = 'ERR_USER_CREATE';

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

type CreateUserOptions = { emailid: string, phno: string }

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

  async createUser({emailid, phno}: CreateUserOptions): Promise<User> {
    if (!emailid && !phno) {
      throw new UserCreateError('Phone Number or Email is needed to create user');
    }

    const existing = await this.repository.findOne({
      where: [ {phoneNumber: phno}, /* or */ {email: emailid} ]
    });

    if (existing) {
      throw new UserCreateError('User with same email/phno exists');
    }

    const newUser = new User()
    newUser.phoneNumber = phno
    newUser.email = emailid

    const user = await this.repository.save(newUser);

    return user;
  }
}
