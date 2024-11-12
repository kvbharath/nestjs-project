import { ArgumentsHost, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

export class WebSocketExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();

    const errorResponse = {
      status: 'error',
      message: exception.message,
    };

    client.emit('error', errorResponse);
  }
}
