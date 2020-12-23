import { Player } from '@codeblitz/data/src/entities/Player';
import { Socket } from 'socket.io';

export default class GamePlayer {
  readonly player: Player;
  readonly socket: Socket;

  constructor(player: Player, socket: Socket) {
    this.player = player;
    this.socket = socket;
  }
}
