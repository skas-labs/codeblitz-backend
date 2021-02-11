import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway({namespace: 'match'})
export class MatchGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): Promise<string> {

    return new Promise<string>((resolve, reject) => {
      setTimeout(() => resolve('Hello World'), 2000)
    });
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }
}
