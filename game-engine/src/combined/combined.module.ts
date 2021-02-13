import { Module } from '@nestjs/common';
import { GameSessionService } from 'src/game/game-session/game-session.service';
import { MatchMakerService } from 'src/match/match-maker/match-maker.service';

@Module({
  providers: [ MatchMakerService, GameSessionService ]
})
export class CombinedModule {}
