import { AbstractRepository, EntityRepository } from 'typeorm';
import { AuthToken } from '../entities/authtoken.entity';
import { User } from '../entities/user.entity';

class InvalidAuthTokenError extends Error {
  name: 'ERR_INVALID_AUTH_TOKEN';
}


@EntityRepository(AuthToken)
export class AuthtokenRepository extends AbstractRepository<AuthToken> {

  /**
   * Create auth token for a user
   * @param user user for which this token is created
   * @param token uuid auth token (in production do not pass it, let db create one)
   */
  async createToken(user: User, token?: string): Promise<AuthToken> {
    const authToken = await this.repository.save({user, token});
    return authToken;
  }

  /**
   * Validate an auth token and finds which user it belongs to
   * @param token
   * @return user the user the token belonds to if token was valid
   * @throws InvalidAuthTokenError if auth token is invalid
   */
  async validateToken(token: string): Promise<User> {
    const authToken = await this.repository.findOne({
      where: {token},
    });

    if (!authToken) throw new InvalidAuthTokenError();

    return authToken.user;

  }
}