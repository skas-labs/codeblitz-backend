import { Socket } from 'socket.io';

export const emitToAll = (sockets: Socket[], eventName: string, ...args: any[]) => {
  sockets.forEach((socket) => {
    socket.emit(eventName, ...args);
  });
};
