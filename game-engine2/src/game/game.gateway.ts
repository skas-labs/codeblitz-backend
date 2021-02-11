import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({namespace: 'game'})
export class GameGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
