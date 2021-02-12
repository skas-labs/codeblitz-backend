import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Client, Socket } from 'socket.io';

export const GameId = createParamDecorator(
  (data, context: ExecutionContext): string => {
    const client = context.switchToWs().getClient() as Socket
    const gameId = client.handshake.query['X-Game-Id']
    return gameId
  }
);