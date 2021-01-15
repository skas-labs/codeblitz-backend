import { connect } from '@codeblitz/data';
import { QuestionRepository } from '@codeblitz/data/dist/repositories/QuestionRepository';
import GamePlayer from '~/game/GamePlayer';
import GameSession from '~/game/GameSession';

export default class MatchMaker {
  private waitingQueue: Array<GamePlayer>;

  constructor() {
    // noop
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

    // FIXME: double await
    const questions = await (await connect('matchmaker')).getCustomRepository(QuestionRepository).findAll();
    session.start(questions);

    return session;
  }
}
