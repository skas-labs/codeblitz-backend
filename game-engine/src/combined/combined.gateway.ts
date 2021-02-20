import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Inject, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { QueuedGamePlayer } from 'src/match/match-maker/match-maker.service';
import { Socket } from 'socket.io';
import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { GameHandler } from './game.handler';
import { MatchHandler } from './match.handler';
import { MatchId } from '../match/match-id.decorator';
import { _baseGateway } from '../common/_base.gateway';
import { AuthToken } from '../auth/auth-token.decorator';

@WebSocketGateway({namespace: '/'})
export class CombinedGateway extends _baseGateway {
  @Inject() private readonly gameHandler!: GameHandler;
  @Inject() private readonly matchHandler!: MatchHandler;
  //
  // @SubscribeMessage('join')
  // async handleJoin(
  //   @MessageBody() data: string,
  //   @ConnectedSocket() socket: Socket,
  //   @GameId() gameId: string
  // ): Promise<Observable<WsResponse<GameUpdates>>> {
  //
  //   const player = {} as Player; // TODO
  //   const gameUpdates = await this.gameService.joinGame(player, gameId);
  //
  //   return gameUpdates.pipe(map(updates => ({event: updates.event, data: updates})));
  // }
  //
  // @SubscribeMessage('start')
  // handleStart(
  //   @MessageBody() data: string,
  //   @ConnectedSocket() socket: Socket,
  //   @GameId() gameId: string
  // ): void {
  //
  //   const player = {} as Player; // TODO
  //   this.gameService.startGame(player, gameId);
  // }
  //
  // @SubscribeMessage('select_answer')
  // handleSelectAnswer(
  //   @MessageBody() data: string,
  //   @ConnectedSocket() socket: Socket,
  //   @GameId() gameId: string
  // ): void {
  //   const player = {} as Player; // TODO
  //
  //   // fetch questionId and answerId from body
  //   this.gameService.selectAnswer(player, gameId, 1, 1);
  // }

  @SubscribeMessage('match/request')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
    @MatchId() matchId: string,
    @AuthToken() token: string,
  ): Observable<WsResponse<QueuedGamePlayer>> {

    Logger.debug(data, 'match/request:data');
    Logger.debug(token, 'match/request:token');
    //client.handshake.headers
    const player = {} as Player; // TODO
    return this.matchHandler.createMatchRequest(player, matchId);
  }
}
