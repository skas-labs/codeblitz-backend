import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameSessionService } from 'src/game/game-session/game-session.service';
import { MatchMakerService, QueuedGamePlayer } from 'src/match/match-maker/match-maker.service';
import { Socket } from 'socket.io';
import { GameId } from 'src/game/game-id.decorator';
import { GameUpdates } from 'src/game/game-session/game-session.entity';
import { Player } from '@codeblitz/data/dist/entities/player.entity';

@WebSocketGateway({ namespace: '/' })
export class CombinedGateway {
  @Inject() private readonly gameService!: GameSessionService;
  @Inject() private readonly matchMaker!: MatchMakerService;

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
    @GameId() gameId: string
  ): Promise<Observable<WsResponse<GameUpdates>>> {

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
    
    const player = {} as Player // TODO
    this.gameService.startGame(player, gameId);
  }

  @SubscribeMessage('select_answer')
  handleSelectAnswer(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
    @GameId() gameId: string
  ): void {
    const player = {} as Player // TODO

    // fetch questionId and answerId from body
    this.gameService.selectAnswer(player, gameId, 1, 1);
  }

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
