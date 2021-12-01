import { Inject, Injectable } from '@nestjs/common';
import { MatchMakerService, QueuedGamePlayer } from '../match/match-maker/match-maker.service';
import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { Observable } from 'rxjs';
import { WsResponse } from '@nestjs/websockets';
import { map } from 'rxjs/operators';

@Injectable()
export class MatchHandler {
  @Inject() private readonly matchMaker!: MatchMakerService;


  // on match/request
  createMatchRequest(player: Player, matchReqId: string): Observable<WsResponse<QueuedGamePlayer>> {
    const newMatchRequest = this.matchMaker.queuePlayer(player);
    return newMatchRequest.pipe(map(queuePlayer => ({event: 'match/status', data: queuePlayer})));
  }

}