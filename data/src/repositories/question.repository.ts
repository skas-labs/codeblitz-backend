import { AbstractRepository, DeepPartial, EntityRepository, FindManyOptions } from 'typeorm';
import { Question } from '../entities/question.entity';

@EntityRepository(Question)
export class QuestionRepository extends AbstractRepository<Question> {

  async add(question: DeepPartial<Question>): Promise<Question> {
    return await this.repository.save(question);
  }

  async findAll(options?: FindManyOptions<Question>): Promise<Question[]> {
    return this.repository.find(options);
  }
}
