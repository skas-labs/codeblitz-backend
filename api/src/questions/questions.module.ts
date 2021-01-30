import { Module } from '@nestjs/common';
import { QuestionsController } from './questions/questions/questions.controller';
import { TopicsController } from './topics/topics.controller';

@Module({
  controllers: [QuestionsController, TopicsController]
})
export class QuestionsModule {}
