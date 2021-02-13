import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameSessionService } from './game-session/game-session.service';

@Module({
  providers: [ GameGateway, GameSessionService ],
  exports: [ GameSessionService ]
})
export class GameModule {
}
