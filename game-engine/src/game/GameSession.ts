import { Question } from '@codeblitz/data/dist/entities/question.entity';
import { emitToAll } from '~/utils/socket';
import GamePlayer from './GamePlayer';

const QUESTION_TIMER = 10;

export interface GameState {
  totalQuestions: number;
  questionIds: Array<number>;
  playerIds: Array<number>;
}

export interface GameResult {
  playerAnswerMap: {
    [playerId: number]: {
      questionAnswerMap: {
        [questionId: number]: number;
      };
      score: number;
    };
  };
}

export default class GameSession {
  readonly player1: GamePlayer;
  readonly player2: GamePlayer;
  private state: GameState;
  private result: GameResult;
  private currentQuestionIndex: number;

  get currentQuestionId(): number | null {
    const questionIds = this.state.questionIds;

    if (questionIds.length < this.currentQuestionIndex) {
      return questionIds[this.currentQuestionIndex];
    }

    return null;
  }

  constructor(player1: GamePlayer, player2: GamePlayer) {
    this.player1 = player1;
    this.player2 = player2;
  }

  async initializePlayerActionHandlers(player: GamePlayer, otherPlayer: GamePlayer): Promise<void> {
    player.socket.on('select_answer', (msg) => {
      otherPlayer.socket.emit('opponent_selected_answer', {
        questionId: msg.questionId,
      });

      this.result.playerAnswerMap[player.player.id].questionAnswerMap[msg.questionId] =
        msg.answerId;
    });

    player.socket.emit('init', this.state);
  }

  async questionLoop(player1: GamePlayer, player2: GamePlayer): Promise<void> {
    emitToAll([player1.socket, player2.socket], 'round_start', {
      questionId: this.currentQuestionId,
      timer: QUESTION_TIMER,
    });

    setTimeout(() => {
      const player1AnswerId =
        this.currentQuestionId &&
        this.result.playerAnswerMap[this.player1.player.id].questionAnswerMap[
          this.currentQuestionId
        ];
      const player2AnswerId =
        this.currentQuestionId &&
        this.result.playerAnswerMap[this.player2.player.id].questionAnswerMap[
          this.currentQuestionId
        ];

      emitToAll([player1.socket, player2.socket], 'question_result', {
        status: 'anwered',
        questionId: this.currentQuestionId,
        correctAnswerId: 1,
        players: [
          { id: this.player1.player.id, selectedChoiceId: player1AnswerId },
          { id: this.player2.player.id, selectedChoiceId: player2AnswerId },
        ],
      });

      this.currentQuestionIndex += 1;
      if (this.currentQuestionId) {
        this.questionLoop(player1, player2);
      } else {
        emitToAll([player1.socket, player2.socket], 'match_ended');
      }
    }, QUESTION_TIMER);
  }

  async start(questions: Array<Question>): Promise<void> {
    this.state = {
      totalQuestions: questions.length,
      questionIds: questions.map((_) => _.id),
      playerIds: [this.player1.player.id, this.player2.player.id],
    };
    this.result = {
      playerAnswerMap: {
        [this.player1.player.id]: {
          questionAnswerMap: {},
          score: 0,
        },
        [this.player2.player.id]: {
          questionAnswerMap: {},
          score: 0,
        },
      },
    };
    this.currentQuestionIndex = 0;

    await this.initializePlayerActionHandlers(this.player1, this.player2);
    await this.initializePlayerActionHandlers(this.player2, this.player1);
  }
}
