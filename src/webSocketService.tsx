import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000'; // Your Flask server URL

class WebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(SERVER_URL);
    this.setupListeners();
  }

  private setupListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('updates', (data: any) => {
      console.log('Training complete:', data);
      // Handle training complete event
    });
  }
}

export default new WebSocketService();
