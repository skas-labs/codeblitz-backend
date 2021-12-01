import { Inject, Injectable } from '@nestjs/common';
import { GameSessionService } from '../game/game-session/game-session.service';
import { SubscribeMessage } from '@nestjs/websockets';
import { Player } from '@codeblitz/data/dist/entities/player.entity';

@Injectable()
export class GameHandler {
  @Inject() private readonly gameService!: GameSessionService;

  // on game/join
  joinGame(player: Player, gameId: string) {

  }
}