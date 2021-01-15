import { AbstractRepository, EntityRepository } from 'typeorm';
import { Question } from '../entities/Question';

@EntityRepository(Question)
export class QuestionRepository extends AbstractRepository<Question> {

  async findAll(): Promise<Question[]> {
    return this.repository.find()
  }
}
