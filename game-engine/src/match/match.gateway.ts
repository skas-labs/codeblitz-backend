import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
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
import { Player } from '@codeblitz/data/dist/entities/player.entity';

@WebSocketGateway({namespace: '/match'})
export class MatchGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
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

  afterInit(server: Server): void {
    Logger.debug(server, 'SERVER_INIT')
  }

  handleConnection(client: Socket, ...args: []): void {
    Logger.debug(client, 'CONNECTION')
    Logger.debug(args, 'CONNECTION_ARGS')
  }

  handleDisconnect(client: Socket): void {
    Logger.debug(client, 'DISCONNECT')
  }

}
