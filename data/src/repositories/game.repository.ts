import { AbstractRepository, EntityRepository } from 'typeorm';
import { GameSession, GameState } from '../entities/gamesession.entity';

export class GameNotFoundError extends Error {
  name = 'ERR_GAME_NOT_FOUND';
}

@EntityRepository(GameSession)
export class GameRepository extends AbstractRepository<GameSession> {

  async findGameById(gameId: string): Promise<GameSession> {
    const game = await this.repository.findOne({where: {id: gameId}});
    if (!game) {
      throw new GameNotFoundError('No game found with this game id')
    }
    return game as unknown as GameSession
  }

  async updateGameState(game: GameSession, state: GameState): Promise<GameSession> {
    game.gameState = state
    return await this.repository.save(game)
  }

}