import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { Question } from '@codeblitz/data/dist/entities/question.entity';
import { BehaviorSubject } from 'rxjs';

const QUESTION_TIMER = 10000;

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

export interface QuestionResult {
  status: 'answered';
  questionId: number;
  correctAnswerId: number;
  players: Array<{ id: number, selectedChoiceId: number }>;
}

export interface RoundStartState {
  questionId: number;
  timer: number;
}

export interface PlayerAnswer {
  questionId: number;
  answerId: number;
  player: Player;
}

export class GameSession {
  gameId!: string; // uuid from db
  player1!: Player;
  player2!: Player;

  gameState: GameState;
  gameResult: GameResult;
  currentQuestionIndex: number;
  gameUpdates!: BehaviorSubject<GameUpdates>;

  constructor(gameId: string, questions: Array<Question>) {
    this.gameId = gameId;
    this.currentQuestionIndex = 0;
    this.gameState = {
      totalQuestions: questions.length,
      questionIds: questions.map((_) => _.id),
      playerIds: [],
    }
    this.gameResult = {
      playerAnswerMap: {},
    };
    this.gameUpdates = new BehaviorSubject<GameUpdates>(new GameInitState(gameId, this.gameState));
  }

  get currentQuestionId(): number | null {
    const questionIds = this.gameState.questionIds;

    if (this.currentQuestionIndex < questionIds.length) {
      return questionIds[this.currentQuestionIndex];
    }

    return null;
  }

  joinGame(player: Player) {
    // TODO: join to correct player check via id
    this.gameUpdates.next(new PlayerJoinedUpdate(this.gameId, player))

    if (!this.player1) { 
      this.player1 = player 
      this.gameState.playerIds = [...this.gameState.playerIds, this.player1.id]
      this.gameResult.playerAnswerMap[this.player1.id] = {
        questionAnswerMap: {},
        score: 0,
      }
    }
    else if (!this.player2) { 
      this.player2 = player
      this.gameState.playerIds = [...this.gameState.playerIds, this.player2.id]
      this.gameResult.playerAnswerMap[this.player2.id] = {
        questionAnswerMap: {},
        score: 0,
      }
    }

    this.gameUpdates.next(new GameInitState(this.gameId, this.gameState));
  }

  start() {
    if (!this.player1 || !this.player2) {
      this.gameUpdates.next(new ErrorUpdate(this.gameId, 'All players haven\'t connected'))
      return 
    }

    this.gameUpdates.next(new RoundStartUpdate(this.gameId, {
      questionId: this.currentQuestionId!,
      timer: QUESTION_TIMER
    }));
    
    setTimeout(() => {
      const player1AnswerId =
        this.currentQuestionId &&
        this.gameResult.playerAnswerMap[this.player1.id].questionAnswerMap[
          this.currentQuestionId
        ];
      const player2AnswerId =
        this.currentQuestionId &&
        this.gameResult.playerAnswerMap[this.player2.id].questionAnswerMap[
          this.currentQuestionId
        ];


      this.gameUpdates.next(new QuestionResultUpdate(this.gameId, {
        status: 'answered',
        questionId: this.currentQuestionId!,
        correctAnswerId: 1,
        players: [
          { id: this.player1.id, selectedChoiceId: player1AnswerId! },
          { id: this.player2.id, selectedChoiceId: player2AnswerId! },
        ]
      }));

      this.currentQuestionIndex += 1;

      if (this.currentQuestionId) {
        this.start();
      } else {
        this.gameUpdates.next(new GameEndedUpdate(this.gameId));
      }
    }, QUESTION_TIMER);
  }

  playerAnswerQuestion(player: Player, questionId: number, answerId: number) {
    this.gameResult.playerAnswerMap[player.id].questionAnswerMap[questionId] = answerId;
    this.gameUpdates.next(new PlayerAnswerUpdate(this.gameId, {
      player,
      questionId,
      answerId
    }))
  }
}

export abstract class GameUpdates {
  abstract gameId: string;
  abstract event: string;
}

class GameInitState extends GameUpdates {
  gameId: string;
  gameState: GameState;
  event: string = 'init';

  constructor(gameId: string, gameState: GameState) {
    super();
    this.gameId = gameId;
    this.gameState = gameState;
  }
}

class PlayerJoinedUpdate extends GameUpdates {
  gameId: string;
  player: Player;
  event: string = 'player_joined';

  constructor(gameId: string, player: Player) {
    super();
    this.gameId = gameId;
    this.player = player;
  }
}

class QuestionResultUpdate extends GameUpdates {
  gameId: string;
  questionResult: QuestionResult;
  event: string = 'question_result';

  constructor(gameId: string, questionResult: QuestionResult) {
    super()
    this.gameId = gameId;
    this.questionResult = questionResult;
  }

}

class RoundStartUpdate extends GameUpdates {
  gameId: string;
  roundStartState: RoundStartState;
  event: string = 'round_start';
  

  constructor(gameId: string, roundStartState: RoundStartState) {
    super();
    this.gameId = gameId;
    this.roundStartState = roundStartState
  }
}

class GameEndedUpdate extends GameUpdates {
  gameId: string;
  event: string = 'game_ended';

  constructor(gameId: string) {
    super();
    this.gameId = gameId;
  }
}

class PlayerAnswerUpdate extends GameUpdates {
  gameId: string;
  playerAnswer: PlayerAnswer;
  event: string = 'player_selected_answer';

  constructor(gameId: string, playerAnswer: PlayerAnswer) {
    super();
    this.gameId = gameId;
    this.playerAnswer = playerAnswer;
  }
}

class ErrorUpdate extends GameUpdates {
  gameId: string;
  error: string;
  event: string = 'game_error';

  constructor(gameId: string, error: string) {
    super();
    this.gameId = gameId;
    this.error = error;
  }
}
