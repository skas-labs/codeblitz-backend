import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';


export class _baseGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  afterInit(server: Server): void {
    Logger.debug({namespace: server.nsps}, 'SERVER_INIT');
  }

  handleConnection(client: Socket, ...args: []): void {
    Logger.debug({id: client.id, rooms: client.rooms}, 'CONNECTION');
    Logger.debug([...args], 'CONNECTION_ARGS');
  }

  handleDisconnect(client: Socket): void {
    Logger.debug({id: client.id, rooms: client.rooms}, 'DISCONNECT');
  }
}