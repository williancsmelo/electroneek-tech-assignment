import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  namespace: '/app-ui',
  cors: true
})
export class ApiGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  handleConnection(socket: Socket) {
    socket.onAny((eventName, ...args) => {
      this.server.emit(eventName, args)
    })
  }

  handleDisconnect(): any {}

  constructor() {}
}
