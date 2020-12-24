import { Connection, createConnection, getCustomRepository } from 'typeorm';
import { User } from './entities/User';
import { Player } from './entities/Player';
import { Question } from './entities/Question';
import { UserRepository } from './repositories/UserRepository';
import { QuestionRepository } from './repositories/QuestionRepository';

export const Entities = {
  User,
  Player,
  Question,
};

export const Repositories = {
  userRepo: getCustomRepository(UserRepository),
  questionRepo: getCustomRepository(QuestionRepository),
};

export async function connect(): Promise<Connection> {
  return await createConnection({
    type: 'postgres',
    username: 'codeblitz',
    database: 'codeblitz',
    password: 'codeblitz',
    entities: [User, Player, Question],
    logger: 'debug',
    logging: 'all',
    synchronize: true,
    dropSchema: true,
  });
}

// TODO: --- For testing remove ---
connect()
  .then((c) => {
    console.log(c.entityMetadatas);
  })
  .catch(console.error);
