import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { BehaviorSubject } from 'rxjs';


export class GameSession {
  gameId!: string // uuid from db
  player1!: Player
  player2!: Player

  // questions, state blah blah
  gameUpdates!: BehaviorSubject<GameUpdates>

  joinGame(player: Player) {
    // TODO: join to correct player check via id
    if (this.player1 == null) { this.player1 = player }
    else if (this.player2 == null) { this.player2 = player }

    this.gameUpdates.next(new PlayerJoinedUpdate(this.gameId, player))
  }


  constructor(gameId: string) {
    this.gameId = gameId;
    this.gameUpdates = new BehaviorSubject<GameUpdates>(new GameInitState(gameId))
  }
}

export abstract class GameUpdates {
  abstract gameId: string
}

class GameInitState extends GameUpdates {
  gameId: string;
  constructor(gameId: string) {
    super();
    this.gameId = gameId;
  }
}

class PlayerJoinedUpdate extends GameUpdates {
  gameId: string;
  player: Player

  constructor(gameId: string, player: Player) {
    super();
    this.gameId = gameId;
    this.player = player;
  }
}