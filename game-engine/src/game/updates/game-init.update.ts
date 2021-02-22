import { _baseGameUpdate } from './_base.update';
import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { Timings } from '../game-score-sheet.entity';

class PlayerData {
  player1: Player
  player2: Player

  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
  }
}



export class GameInitUpdate extends _baseGameUpdate {
  timings: Timings
  players: PlayerData


  constructor(gameId: string, timings: Timings, players: PlayerData) {
    super('game/init', gameId);
    this.timings = timings;
    this.players = players;
  }
}