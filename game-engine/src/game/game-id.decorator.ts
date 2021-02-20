import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface GameEvent {
  game_id: string
}

export const GameId = createParamDecorator(
  (data, context: ExecutionContext): string => {
    const eventData = context.switchToWs().getData() as GameEvent;
    const gameId = eventData.game_id;
    return gameId;
  }
);