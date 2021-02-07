import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { Socket } from 'socket.io';

export default class GamePlayer {
  readonly player: Player;
  readonly socket: Socket;
  readonly matchReqId: string;

  constructor(player: Player, socket: Socket, matchReqId: string) {
    this.player = player;
    this.socket = socket;
    this.matchReqId = matchReqId;
  }
}
