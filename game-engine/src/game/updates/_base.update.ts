import { IsUUID } from 'class-validator';

export abstract class _baseGameUpdate {
  abstract name: string;

  @IsUUID()
  gameId!: string;

  constructor(gameId: string) {
    this.gameId = gameId;
  }
}
