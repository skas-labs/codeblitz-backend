import {connect, Repositories} from '@codeblitz/data';
import GamePlayer from '~/game/GamePlayer';
import GameSession from '~/game/GameSession';
import {QuestionRepository} from "@codeblitz/data/dist/repositories/QuestionRepository";

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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const otherPlayer = this.waitingQueue.pop()!;
    this.startSession(player, otherPlayer);
  }

  async startSession(player1: GamePlayer, player2: GamePlayer): Promise<GameSession> {
    const session = new GameSession(player1, player2);

    // FIXME: double await
    const questions = await (await connect()).getCustomRepository(QuestionRepository).find();
    session.start(questions);

    return session;
  }
}
