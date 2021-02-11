import { QuestionRepository } from '@codeblitz/data/dist/repositories/question.repository';
import { Question } from '@codeblitz/data/dist/entities/question.entity';
import Answers = Question.Answers;
import Options = Question.Options;

/** @internal */
export async function seedQuestions(repo: QuestionRepository) {
  const questions: Array<Partial<Question>> = [
    {
      title: 'Which is an invalid JavaScript keyword',
      options: new Options({
        a: 'val',
        b: 'var',
        c: 'let',
        d: 'const',
      }),
      answers: new Answers('a'),
    },
    {
      title: 'Which is not the name of a programming language',
      options: new Options({
        a: 'F#',
        b: 'C#',
        c: 'J#',
        d: 'T#',
      }),
      answers: new Answers('d'),
    },
  ];

  for (const q of questions) {
    console.log('inserted', await repo.add(q))
  }
}