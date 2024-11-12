import { Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class SocketClient implements OnModuleInit {
  public socketClient: Socket;

  constructor() {
    try {
      this.socketClient = io('http://localhost:3000');
    } catch (error) {
      console.error('Error initializing Client:', error);
    }
  }

  onModuleInit() {
    this.registerConsumerEvents();
  }
  private registerConsumerEvents() {
    // this.socketClient.emit('newMessage', { msg: 'Hey there!!' });
    this.socketClient.on('connect', () => {
      console.log('Connected to gateway');
    });

    // Listen for messages from the server
    this.socketClient.on('onMessage', (payload: any) => {
      console.log('Received message:', payload);
    });
    // Handle connection errors
    this.socketClient.on('connect_error', (error) => {
      console.error('Connection error:', error.message);
    });

    // Handle disconnections
    this.socketClient.on('disconnect', (reason) => {
      console.warn('Disconnected from server:', reason);
    });

    // Listen for custom error events sent by the server
    this.socketClient.on('error', (error) => {
      console.error('Server error event:', error.message);
    });
  }
}
