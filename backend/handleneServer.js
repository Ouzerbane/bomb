import {WebSocketServer} from 'ws';
import Rom from './Rom.js';

export default class Game {
  constructor(port=8080) {
    this.port = port;
    this.wss = new WebSocketServer({ port });
    this.players = [];
    this.Roms = new Rom();
    this.characters = ['char1', 'char2', 'char3', 'char4'];
    this.positions = [
      { x: 1, y: 1 },
      { x: 1, y: 13 },
      { x: 13, y: 1 },
      { x: 13, y: 13 }
    ];

    this.wss.on('connection', (ws) => this.handleConnection(ws));
    console.log(`WebSocket server running on ws://localhost:${port}`);
  }

  handleConnection(ws) {
    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
      
      let data = JSON.parse(message);
      switch (data.type) {
        case 'login':
          this.handeleloguin(ws , data);
      }
    })  }
  handeleloguin(ws , data) {

    if (data.name.trim() === '') {
      this.SendError(ws, 'Nickname cannot be empty');
      return;
    }
    if (this.players.length >= 4) {
      this.SendError(ws, 'Maximum players reached');
      return;
    }
    if (this.players.some(player => player.nickname === data.nickname)) {
      this.SendError(ws, 'Nickname already taken');
      return;
    }
    if (this.Roms.state !== 'waiting') {
      this.SendError(ws, 'Game is already in progress');
      return;
    }

    this.SendError(ws, data);

  }

  SendError(ws, message) {
    ws.send(JSON.stringify({ type: 'error', message }));
  }
}
