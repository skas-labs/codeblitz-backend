import { Injectable } from '@nestjs/common';
import { GameSession, GameUpdates } from './game-session.entity';
import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { Observable } from 'rxjs';

@Injectable()
export class GameSessionService {

  private games: Map<string, GameSession> = new Map<string, GameSession>();

  joinGame(player: Player, gameId: string): Observable<GameUpdates> {

    // TODO: check if gameID is valid
    // TODO: check if this player can join this game

    let gameSession: GameSession;
    if (this.games.has(gameId)) {
      gameSession = this.games.get(gameId)!;
    } else {
      gameSession = new GameSession(gameId);
      this.games.set(gameId, gameSession);
    }

    gameSession.joinGame(player);

    return gameSession.gameUpdates.asObservable();

  }

}
