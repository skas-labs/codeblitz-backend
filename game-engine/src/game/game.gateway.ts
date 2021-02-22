import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Inject, Logger } from '@nestjs/common';
import { GameSessionService } from './game-session/game-session.service';
import { Socket } from 'socket.io';
import { Observable } from 'rxjs';
import { GameUpdates } from './game-session/game-session.entity';
import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { map } from 'rxjs/operators';
import { GameId } from './game-id.decorator';
import { _baseGateway } from '../common/_base.gateway';

/**
 * DO NOT USE THIS ONE FOR NOW
 */

@WebSocketGateway({namespace: '/game'})
export class GameGateway extends _baseGateway {
  @Inject() gameService!: GameSessionService;

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
    @GameId() gameId: string
  ): Promise<Observable<WsResponse<GameUpdates>>> {

    Logger.debug({data, gameId}, 'EVENT_JOIN')

    const player = {} as Player; // TODO
    const gameUpdates = await this.gameService.joinGame(player, gameId);

    return gameUpdates.pipe(map(updates => ({event: updates.event, data: updates})));
  }

  @SubscribeMessage('start')
  handleStart(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
    @GameId() gameId: string
  ): void {

    const player = {} as Player; // TODO
    this.gameService.startGame(player, gameId);
  }

  @SubscribeMessage('select_answer')
  handleSelectAnswer(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
    @GameId() gameId: string
  ): void {
    const player = {} as Player; // TODO

    // fetch questionId and answerId from body
    this.gameService.selectAnswer(player, gameId, 1, 1);
  }

}
