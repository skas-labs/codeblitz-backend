import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets';
import { from, interval, Observable, zip } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({namespace: '/match'})
export class MatchGateway {
  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {

    return new Promise<string>((resolve, reject) => {
      setTimeout(() => resolve('Hello World'), 2000)
    });
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {

    return zip(
      from([1,2,3,4,5]),
      interval(2000),
      item => ({ event: 'events', data: item })
    )
  }
}
