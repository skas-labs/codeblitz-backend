import DatabaseService from '~/services/database';
import { Server } from 'http';
import { Server as WebsocketServer, Socket } from 'socket.io';
import GamePlayer from './game/GamePlayer';
import MatchMaker from './match-maker/MatchMaker';

export type Headers = {
  [key: string]: string;
}

export function createSocketIoServer(httpServer: Server): WebsocketServer {
  const websocketServer = new WebsocketServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET'],
    },
  });
  const matchMaker = new MatchMaker();

  websocketServer.on('connect', async (socket: Socket) => {
    const token = (socket.handshake.headers as Headers)['authorization'];
    const matchId = (socket.handshake.headers as Headers)['match-id'];

    const matchRequest = await DatabaseService.repos.matchRequest.findByUuid(matchId);
    const gamePlayer = new GamePlayer(matchRequest.player, socket, matchId);

    console.log(gamePlayer);

    matchMaker.queuePlayer(gamePlayer);
  });

  return websocketServer;
}
