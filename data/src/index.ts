import { Connection, createConnection, getConnection, getCustomRepository } from 'typeorm';
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

export class Repositories {
  private connection: Connection
  constructor(name = 'default') {
    this.connection = getConnection(name)
  }
  get user(): UserRepository { return this.connection.getCustomRepository(UserRepository);}
  get question(): QuestionRepository {return this.connection.getCustomRepository(QuestionRepository);}
  get player(): PlayerRepository { return this.connection.getCustomRepository(PlayerRepository); }
}

export async function connect(name = 'default'): Promise<Connection> {
  return await createConnection({
    name: name,
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
// connect()
//   .then(async (c) => {
//     const repo = c.getCustomRepository(QuestionRepository);
//     await repo.insert({
//       title: 'Another question',
//       text: 'Very interesting',
//       options: {
//         a: new Question.Option('A'),
//         b: new Question.Option('B'),
//         c: new Question.Option('C'),
//         d: new Question.Option('D'),
//       },
//       answers: new Question.Answers('a', 'b'),
//     });
//   })
//   .catch(console.error);
