import { _baseGameUpdate } from './_base.update';
import { Max, Min } from 'class-validator';


export class RoundReadyUpdate  extends _baseGameUpdate {

  @Min(1) @Max(10)
  roundId: number


}