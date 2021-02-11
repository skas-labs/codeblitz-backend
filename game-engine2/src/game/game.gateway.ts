import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import { GameService } from './game.service';

@WebSocketGateway({namespace: '/game'})
export class GameGateway {
  @Inject() gameService!: GameService

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
