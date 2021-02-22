import { Inject, Injectable } from '@nestjs/common';
import { GameSessionService } from '../game/game-session/game-session.service';

@Injectable()
export class GameHandler {
  @Inject() private readonly gameService!: GameSessionService;

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


}