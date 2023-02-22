import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newUser')
  onNewUser() {
    console.log('new user');
    this.server.emit('increaseUsers', {});
  }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Connected');
    });
  }

  public increaseUsers() {
    this.server.emit('increaseUsers', {});
  }

  public increaseAnimals() {
    this.server.emit('increaseAnimals', {});
  }
}
