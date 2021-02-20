import { Inject, Injectable } from '@nestjs/common';
import { GameSessionService } from '../game/game-session/game-session.service';

@Injectable()
export class GameHandler {
  @Inject() private readonly gameService!: GameSessionService;

}