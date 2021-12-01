import { IsIn, IsNumber } from 'class-validator';

export class Timings {
  start: Date
  end: Date

  constructor() {
    this.start = new Date(Date.now());
    this.end = new Date(Date.now() + 10 * 30 * 1000) // 10 ques * 30 seconds
  }
}

type QuestionId = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type AnsOpt = 'a' | 'b' | 'c' | 'd'
type PlayerScore = {
  opt: AnsOpt
  score: number
  tDelta: number
}
type QuestionScore = {
  player1?: PlayerScore
  player2?: PlayerScore
  correct?: AnsOpt
}

type ScoreSheetQuestionMap = {
  [q in QuestionId]?: QuestionScore;
};

class AnswerSubmission {
  @IsIn([ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ])
  questionId: QuestionId;

  @IsIn([ 'a', 'b', 'c', 'd' ])
  answerOpt: AnsOpt;

  @IsNumber()
  tDelta: number;


  constructor(questionId: QuestionId, answerOpt: AnsOpt, tDelta: number) {
    this.questionId = questionId;
    this.answerOpt = answerOpt;
    this.tDelta = tDelta;
  }
}

class ResubmitAnswerException extends Error {
  name = 'ERR_ANSWER_RESUBMIT';
}

export class GameScoreSheet {
  // TODO either make a toJson or serialise
  questions: ScoreSheetQuestionMap = { // TODO use real data
    '0': { correct: 'a' },
    '1': { correct: 'a' },
    '2': { correct: 'a' },
    '3': { correct: 'a' },
    '4': { correct: 'a' },
    '5': { correct: 'a' },
    '6': { correct: 'a' },
    '7': { correct: 'a' },
    '8': { correct: 'a' },
    '9': { correct: 'a' },
  };


  submitAnswerP1(submission: AnswerSubmission) {
    if (this.questions[submission.questionId]?.player1) {
      throw new ResubmitAnswerException();
    }
    // eslint-disable-next-line
    const q = this.questions[submission.questionId]!!
    q.player1 = {
      opt: submission.answerOpt,
      tDelta: submission.tDelta,
      score: submission.answerOpt == q.correct ? 10 : 0
    };
  }

  submitAnswerP2(submission: AnswerSubmission) {
    if (this.questions[submission.questionId]?.player2) {
      throw new ResubmitAnswerException();
    }
    // eslint-disable-next-line
    const q = this.questions[submission.questionId]!!
    q.player2 = {
      opt: submission.answerOpt,
      tDelta: submission.tDelta,
      score: submission.answerOpt == q.correct ? 10 : 0
    };
  }
}