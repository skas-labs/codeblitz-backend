import { Connection, createConnection, getConnection } from 'typeorm';
import { User } from './entities/user.entity';
import { Player } from './entities/player.entity';
import { Question } from './entities/question.entity';
import { UserRepository } from './repositories/user.repository';
import { QuestionRepository } from './repositories/question.repository';
import { PlayerRepository } from './repositories/player.repository';

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