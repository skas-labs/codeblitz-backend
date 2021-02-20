import { Module } from '@nestjs/common';
import { GameHandler } from './game.handler';
import { MatchHandler } from './match.handler';
import { GameModule } from '../game/game.module';
import { MatchModule } from '../match/match.module';
import { CombinedGateway } from './combined.gateway';

@Module({
  imports: [ GameModule, MatchModule ],
  providers: [ CombinedGateway, GameHandler, MatchHandler ],
  exports: [ GameHandler, MatchHandler ]
})
export class CombinedModule {
}
