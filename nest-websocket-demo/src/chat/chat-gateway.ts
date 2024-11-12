import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// @WebSocketGateway(3002, { cors: { origin: '*' } })
// export class ChatGateWay implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer() server: Server;

//   handleConnection(client: Socket) {
//     console.log('User Client connected: ', client.id);

//     client.broadcast.emit('user-joined', {
//       message: `New user Joined the chat: ${client.id}`,
//     });
//   }

//   handleDisconnect(client: Socket) {
//     console.log('User disconnected: ', client.id);
//     this.server.emit('user-left', {
//       message: ` user Left the chat: ${client.id}`,
//     });
//   }

//   @SubscribeMessage('newMessage')
//   handleNewMessage(client: Socket, message: any) {
//     client.emit('reply', 'This is a reply');
//     // this.server.emit('reply', 'broadcasting..');
//   }
// }

@WebSocketGateway()
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
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }
}
