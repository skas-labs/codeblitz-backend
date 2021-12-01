import { _baseGameUpdate } from './_base.update';
import { Max, Min } from 'class-validator';
import { GameSession } from '@codeblitz/data/dist/entities/gamesession.entity';


export class RoundReadyUpdate  extends _baseGameUpdate {
  name = 'game/round_ready'

  @Min(1) @Max(10)
  roundId: number


  constructor(game: GameSession, name: string, roundId: number) {
    super(game);
    this.name = name;
    this.roundId = roundId;
  }
}