import { Connection, createConnection, getCustomRepository } from 'typeorm';
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

export const Repositories = {
  get user(): UserRepository { return getCustomRepository(UserRepository);},
  get question(): QuestionRepository {return getCustomRepository(QuestionRepository);},
  get player(): PlayerRepository { return getCustomRepository(PlayerRepository); }
};

export async function connect(): Promise<Connection> {
  return await createConnection({
    type: 'postgres',
    username: 'codeblitz',
    database: 'codeblitz',
    password: 'codeblitz',
    entities: [User, Player, Question],
    logger: 'advanced-console',
    logging: 'all',
    synchronize: true,
    dropSchema: true,
  });
}

// TODO: --- For testing remove ---
connect()
  .then(async (c) => {
    const repo = c.getCustomRepository(QuestionRepository);
    await repo.insert({
      title: 'Another question',
      text: 'Very interesting',
      options: {
        a: new Question.Option('A'),
        b: new Question.Option('B'),
        c: new Question.Option('C'),
        d: new Question.Option('D'),
      },
      answers: new Question.Answers('a', 'b'),
    });
  })
  .catch(console.error);
