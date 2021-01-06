import { Module } from '@nestjs/common';
import { SessionsController } from './sessions/sessions.controller';
import { MatchreqController } from './matchreq/matchreq.controller';

@Module({
  controllers: [SessionsController, MatchreqController]
})
export class GameModule {}
