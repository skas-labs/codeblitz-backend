import { AbstractRepository, DeepPartial, EntityRepository } from 'typeorm';
import { Question } from '../entities/Question';

@EntityRepository(Question)
export class QuestionRepository extends AbstractRepository<Question> {

  async add(question: DeepPartial<Question>): Promise<Question> {
    return await this.repository.save(question);
  }

  async findAll(): Promise<Question[]> {
    return this.repository.find();
  }
}
