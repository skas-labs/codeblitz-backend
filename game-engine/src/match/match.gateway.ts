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
import { Inject } from '@nestjs/common';
import { MatchMakerService, QueuedGamePlayer } from './match-maker/match-maker.service';
import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { _baseGateway } from '../common/_base.gateway';

@WebSocketGateway({namespace: '/match'})
export class MatchGateway extends _baseGateway {
  @Inject() matchMaker!: MatchMakerService;

  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('request')
  handleMessage(
    @MessageBody() data: string, @ConnectedSocket() socket: Socket,
  ): Observable<WsResponse<QueuedGamePlayer>> {

    //client.handshake.headers
    const player = {} as Player; // TODO

    const newMatchRequest = this.matchMaker.queuePlayer(player);

    return newMatchRequest.pipe(map(queuePlayer => ({event: 'update', data: queuePlayer})));

  }

}
