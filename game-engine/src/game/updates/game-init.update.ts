import { _baseGameUpdate } from './_base.update';
import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { Timings } from '../entities/game-score-sheet.entity';
import { GameSession } from '@codeblitz/data/dist/entities/gamesession.entity';

export class PlayerData {
  player1?: Player
  player2?: Player

  constructor(player1?: Player, player2?: Player) {
    this.player1 = player1;
    this.player2 = player2;
  }
}



export class GameInitUpdate extends _baseGameUpdate {
  name = 'game/init'
  timings: Timings
  players: PlayerData


  constructor(game: GameSession, timings: Timings, players: PlayerData) {
    super(game);
    this.timings = timings;
    this.players = players;
  }
}