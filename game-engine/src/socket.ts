import { Server } from 'http';
import { Server as WebsocketServer, Socket } from 'socket.io';

export function createSocketIoServer(httpServer: Server): WebsocketServer {
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
}
