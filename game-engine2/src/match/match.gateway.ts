import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { Inject, Logger } from '@nestjs/common';
import { MatchMakerService, QueuedGamePlayer } from './match-maker/match-maker.service';
import { GamePlayer } from '../data/game-player.entity';

@WebSocketGateway({namespace: '/match'})
export class MatchGateway {
  @Inject() matchMaker!: MatchMakerService;

  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('request')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Observable<WsResponse<QueuedGamePlayer>> {

    const newMatchRequest = this.matchMaker.queuePlayer({} as GamePlayer);

    return newMatchRequest.pipe(map(queuePlayer => ({event: 'update', data: queuePlayer})));

  }

}
