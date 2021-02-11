import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import { GameSessionService } from './game-session/game-session.service';
import { Socket } from 'socket.io';
import { Observable } from 'rxjs';
import { GameUpdates } from './game-session/game-session.entity';
import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { map } from 'rxjs/operators';

@WebSocketGateway({namespace: '/game'})
export class GameGateway {
  @Inject() gameService!: GameSessionService;

  @SubscribeMessage('join')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ): Observable<WsResponse<GameUpdates>> {

    const player = {} as Player; // TODO
    const gameId = 'db264843-a8cd-4b04-ae4a-3e8754c3272e';
    const gameUpdates = this.gameService.joinGame(player, gameId);

    return gameUpdates.pipe(map(updates => ({event: 'updates', data: updates})));

  }
}
