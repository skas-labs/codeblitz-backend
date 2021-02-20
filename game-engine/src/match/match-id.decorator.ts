import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';

export const MatchId = createParamDecorator(
  (data, context: ExecutionContext): string => {
    const client = context.switchToWs().getClient() as Socket;
    const matchId = client.handshake.query['match_id'];
    return matchId;
  }
);