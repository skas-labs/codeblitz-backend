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

  // ========== GAME EVENTS START ============
  @SubscribeMessage('game/join')
  handleGameJoin() { return }

  @SubscribeMessage('game/select_answer')
  handleGameAnswer() { return }

  @SubscribeMessage('game/abandon')
  handleGameAbandon() { return }

  // ========== GAME EVENTS END ============

  // ========== MATCH EVENTS START ============

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

  // ========== MATCH EVENTS START ============

}
