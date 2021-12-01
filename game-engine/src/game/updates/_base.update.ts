import { GameSession } from '@codeblitz/data/dist/entities/gamesession.entity';

export abstract class _baseGameUpdate {
  abstract name: string;

  game!: GameSession;


  constructor(game: GameSession) {
    this.game = game;
  }
}
