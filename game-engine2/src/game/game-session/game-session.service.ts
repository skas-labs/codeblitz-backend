import { Inject, Injectable } from '@nestjs/common';
import { GameSession, GameUpdates } from './game-session.entity';
import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class GameSessionService {
  @Inject() private readonly database!: DatabaseService;

  private games: Map<string, GameSession> = new Map<string, GameSession>();

  async joinGame(player: Player, gameId: string): Promise<Observable<GameUpdates>> {

    // TODO: check if gameID is valid
    // TODO: check if this player can join this game

    let gameSession: GameSession;
    if (this.games.has(gameId)) {
      gameSession = this.games.get(gameId)!;
    } else {
      const questions = await this.database.questions.findAll({
        take: 10
      });

      gameSession = new GameSession(gameId, questions);
      this.games.set(gameId, gameSession);
    }

    gameSession.joinGame(player);

    return gameSession.gameUpdates.asObservable();

  }

  startGame(player: Player, gameId: string): void {
    // TODO: check if gameID is valid
    // TODO: check if this player can start this game

    const gameSession = this.games.get(gameId);
    gameSession!.start();

  }

  selectAnswer(player: Player, gameId: string, questionId: number, answerId: number) {
    // TODO: check if gameID is valid
    // TODO: check if this player can start this game

    const gameSession = this.games.get(gameId);
    gameSession!.playerAnswerQuestion(player, questionId, answerId);
  }
}
