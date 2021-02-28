import { Connection, createConnection, getConnection } from 'typeorm';
import { User } from './entities/user.entity';
import { Player } from './entities/player.entity';
import { Question } from './entities/question.entity';
import { UserRepository } from './repositories/user.repository';
import { QuestionRepository } from './repositories/question.repository';
import { PlayerRepository } from './repositories/player.repository';
import { Follow } from './entities/follow.entity';
import { MatchRequest } from './entities/match.entity';
import { MatchRequestRepository } from './repositories/matchRequest.repository';
import { AuthtokenRepository } from './repositories/authtoken.repository';
import { AuthToken } from './entities/authtoken.entity';
import { RegistrationRepository } from './repositories/registration.repository';
import { Registration } from './entities/registration.entity';

export const Entities = {
  User,
  Player,
  Question,
  MatchRequest,
};

export class DataStore {
  connection: Connection;
  repositories: Repositories;

  constructor(connection: Connection, repositories: Repositories) {
    this.connection = connection;
    this.repositories = repositories;
  }
}

export class Repositories {
  private connection: Connection;
  private constructor(name = 'default') {
    this.connection = getConnection(name);
  }
  get user(): UserRepository { return this.connection.getCustomRepository(UserRepository);}
  get question(): QuestionRepository {return this.connection.getCustomRepository(QuestionRepository);}
  get player(): PlayerRepository { return this.connection.getCustomRepository(PlayerRepository); }
  get matchRequest(): MatchRequestRepository { return this.connection.getCustomRepository(MatchRequestRepository); }
  get auth(): AuthtokenRepository { return this.connection.getCustomRepository(AuthtokenRepository); }
  get registration(): RegistrationRepository { return this.connection.getCustomRepository(RegistrationRepository); }

  static getInstance(name: string): Repositories {
    return new Repositories(name)
  }
}


export async function connect(name = 'default', force = false): Promise<DataStore> {
  const connection = await createConnection({
    name: name,
    type: 'postgres',
    username: 'codeblitz',
    database: 'codeblitz',
    password: 'codeblitz',
    entities: [ User, Player, Follow, Question, MatchRequest, AuthToken, Registration ],
    logger: 'advanced-console',
    logging: 'all',
    synchronize: true,
    dropSchema: force,
  });
  const repositories = Repositories.getInstance(name);
  return new DataStore(connection, repositories);
}