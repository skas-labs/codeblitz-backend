import { Server } from 'http';
import { Server as WebsocketServer, Socket } from 'socket.io';

export const createSocketIoServer = (httpServer: Server) => {
  const websocketServer = new WebsocketServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET'],
    },
  });

  websocketServer.on('connect', (socket: Socket) => {
    socket.emit('message', 'Hello From Server');
    socket.on('message', (msg: string) => {
      console.log(msg);
    });
  });

  return websocketServer;
};
