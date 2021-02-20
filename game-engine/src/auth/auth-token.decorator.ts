import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';


export const AuthToken = createParamDecorator(
  (data, context: ExecutionContext): string => {
    const socket = context.switchToWs().getClient() as Socket;
    if (!socket.handshake.query.auth_token) {
      throw new WsException("Auth Token not present")
    }
    return socket.handshake.query.auth_token
  }
);