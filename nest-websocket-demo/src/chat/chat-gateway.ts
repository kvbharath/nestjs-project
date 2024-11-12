import { OnModuleInit, UseFilters } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WebSocketExceptionFilter } from 'src/exceptions/WsExceptionFilter';

@WebSocketGateway()
@UseFilters(WebSocketExceptionFilter)
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('newMessage')
  OnNewMessage(@MessageBody() body: any) {
    try {
      if (!body || !body.message) {
        throw new WsException('Message content is required');
      }
      console.log(body);
      this.server.emit('onMessage', {
        msg: 'New Message',
        content: body.message,
      });
    } catch (error) {
      throw new WsException(error.message || 'Failed to handle message');
    }
  }
}
