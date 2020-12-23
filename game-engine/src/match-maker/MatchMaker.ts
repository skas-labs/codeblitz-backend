import { Repositories } from '@codeblitz/data';
import GamePlayer from '~/game/GamePlayer';
import GameSession from '~/game/GameSession';

export default class MatchMaker {
  private waitingQueue: Array<GamePlayer>;

  constructor() {}

  async queuePlayer(player: GamePlayer): Promise<void> {
    if (this.waitingQueue.length === 0) {
      this.waitingQueue.push(player);
      return;
    }

    const otherPlayer = this.waitingQueue.pop()!;
    this.startSession(player, otherPlayer);
  }

  async startSession(player1: GamePlayer, player2: GamePlayer): Promise<GameSession> {
    const session = new GameSession(player1, player2);

    const questions = await Repositories.questionRepo.find();
    session.start(questions);

    return session;
  }
}
