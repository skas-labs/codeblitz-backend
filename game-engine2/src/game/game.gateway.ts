import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import { GameSessionService } from './game-session/game-session.service';
import { Socket } from 'socket.io';
import { Observable } from 'rxjs';
import { GameUpdates } from './game-session/game-session.entity';
import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { map } from 'rxjs/operators';
import { GameId } from './game-id.decorator';

@WebSocketGateway({namespace: '/game'})
export class GameGateway {
  @Inject() gameService!: GameSessionService;

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
    @GameId() gameId: string
  ): Observable<WsResponse<GameUpdates>> {

    const player = {} as Player; // TODO
    const gameUpdates = this.gameService.joinGame(player, gameId);

    return gameUpdates.pipe(map(updates => ({event: 'updates', data: updates})));

  }

  @SubscribeMessage('fuck')
  handlePing(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
    @GameId() gameId: string
  ): string {

    const player = {} as Player; // TODO
    const gameUpdates = this.gameService.pingGame(player, gameId);

    return `PINGED ${gameId}`;

  }


}
