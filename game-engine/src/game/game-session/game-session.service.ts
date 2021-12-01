import { Inject, Injectable } from '@nestjs/common';
import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { GameState } from '@codeblitz/data/dist/entities/gamesession.entity';
import { _baseGameUpdate as GameUpdate } from '../updates/_base.update';
import { GameRepository } from '@codeblitz/data/dist/repositories/game.repository';
import { GameInitUpdate, PlayerData } from '../updates/game-init.update';
import { Timings } from '../entities/game-score-sheet.entity';

class InvalidGameError extends Error {
  name = 'ERR_GAME_INVALID';
}

@Injectable()
export class GameSessionService {
  @Inject() private readonly database!: DatabaseService;

  get gameRepo(): GameRepository {
    return this.database.games;
  }

  private games = new Map<string, BehaviorSubject<GameUpdate>>();

  async joinGame(player: Player, gameId: string): Promise<Observable<GameUpdate>> {
    let gameUpdate = this.games.get(gameId);
    let game = gameUpdate?.value.game
    if (!gameUpdate?.value.game) {
      game = await this.gameRepo.findGameById(gameId);
      gameUpdate = new BehaviorSubject<GameUpdate>(
        new GameInitUpdate(game, new Timings(), new PlayerData(
          game.player1!, game.player2!
        ))
      );
      this.games.set(gameId, gameUpdate)
    }

    if (!((player.id == game?.player1?.id) || (player.id == game?.player2?.id))) {
      throw new InvalidGameError(`Player ${ player.id } not allowed in game ${ gameId }`);
    } else {
      this.gameRepo.updateGameState(game, GameState.WAITING_PLAYERS);
    }

    return game!;

  }

  startGame(player: Player, gameId: string): void {
    // TODO: check if gameID is valid
    // TODO: check if this player can start this game

    const gameSession = this.games.get(gameId);
    // gameSession!.start();

  }

  selectAnswer(player: Player, gameId: string, questionId: number, answerId: number) {
    // TODO: check if gameID is valid
    // TODO: check if this player can start this game
    //
    // const gameSession = this.games.get(gameId);
    // gameSession!.playerAnswerQuestion(player, questionId, answerId);
  }
}
