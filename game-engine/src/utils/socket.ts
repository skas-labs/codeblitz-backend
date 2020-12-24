import { Socket } from 'socket.io';

export function emitToAll(sockets: Socket[], eventName: string, ...args: unknown[]): void {
  sockets.forEach((socket) => {
    socket.emit(eventName, ...args);
  });
}
