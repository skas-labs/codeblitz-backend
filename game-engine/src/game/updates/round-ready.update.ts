import { _baseGameUpdate } from './_base.update';
import { Max, Min } from 'class-validator';


export class RoundReadyUpdate  extends _baseGameUpdate {
  name = 'game/round_ready'

  @Min(1) @Max(10)
  roundId: number


  constructor(gameId: string, name: string, roundId: number) {
    super(gameId);
    this.name = name;
    this.roundId = roundId;
  }
}