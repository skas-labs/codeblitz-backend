import { QuestionRepository } from "@codeblitz/data/dist/repositories/question.repository";
import { Inject, Injectable } from "@nestjs/common";
import { Database } from "./database.provider";

@Injectable()
export class DatabaseService {
  @Inject() private readonly database!: Database;

  get questions(): QuestionRepository {
    return this.database.repos.question;
  }
}
