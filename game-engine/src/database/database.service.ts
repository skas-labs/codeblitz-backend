import { QuestionRepository } from "@codeblitz/data/dist/repositories/question.repository";
import { Inject, Injectable } from "@nestjs/common";
import { Database } from "./database.provider";
import { UserRepository } from '@codeblitz/data/dist/repositories/user.repository';
import { AuthtokenRepository } from '@codeblitz/data/dist/repositories/authtoken.repository';

@Injectable()
export class DatabaseService {
  @Inject() private readonly database!: Database;

  get questions(): QuestionRepository {
    return this.database.repos.question;
  }
  get users(): UserRepository {
    return this.database.repos.user
  }
  get authTokens(): AuthtokenRepository {
    return this.database.repos.auth
  }
}
