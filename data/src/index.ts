import { Connection, createConnection, getConnection } from 'typeorm';
import { User } from './entities/User';
import { Player } from './entities/Player';
import { Question } from './entities/Question';
import { UserRepository } from './repositories/UserRepository';
import { QuestionRepository } from './repositories/QuestionRepository';
import { PlayerRepository } from './repositories/PlayerRepository';

export const Entities = {
  User,
  Player,
  Question,
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
    entities: [ User, Player, Question ],
    logger: 'advanced-console',
    logging: 'all',
    synchronize: true,
    dropSchema: force,
  });
  const repositories = Repositories.getInstance(name);
  return new DataStore(connection, repositories);
}