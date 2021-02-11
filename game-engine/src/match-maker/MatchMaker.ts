import DatabaseService from '~/services/database';
import GamePlayer from '~/game/GamePlayer';
import GameSession from '~/game/GameSession';

export default class MatchMaker {
  private waitingQueue: Array<GamePlayer>;

  constructor() {
    this.waitingQueue = [];
  }

  async queuePlayer(player: GamePlayer): Promise<void> {
    if (this.waitingQueue.length === 0) {
      this.waitingQueue.push(player);
      return;
    }

    // FIXME
    const otherPlayer = this.waitingQueue.pop()!;
    await this.startSession(player, otherPlayer);
  }

  async startSession(player1: GamePlayer, player2: GamePlayer): Promise<GameSession> {
    const session = new GameSession(player1, player2);

    const questions = await DatabaseService.repos.question.findAll({
      take: 5
    });
    session.start(questions);

    return session;
  }
}
