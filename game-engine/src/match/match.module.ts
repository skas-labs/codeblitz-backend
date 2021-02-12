import { Module } from '@nestjs/common';
import { MatchGateway } from './match.gateway';
import { MatchMakerService } from './match-maker/match-maker.service';

@Module({
  providers: [MatchGateway, MatchMakerService]
})
export class MatchModule {}
