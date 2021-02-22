import { IsUUID } from 'class-validator';

export abstract class _baseGameUpdate {
  name!: string;

  @IsUUID()
  gameId!: string;

  constructor(name: string, gameId: string) {
    this.name = name;
    this.gameId = gameId;
  }
}
