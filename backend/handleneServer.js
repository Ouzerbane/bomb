import {WebSocketServer} from 'ws';

export default class Game {
  constructor(port=8080) {
    this.port = port;
    this.wss = new WebSocketServer({ port });

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
      let data = JSON.parse(message);
      switch (data.type) {
        case 'login':
          this.handeleloguin();
      }
      // if (data.type === 'login') {
      //   const characterIndex = this.characters.indexOf(data.name);
      //   if (characterIndex !== -1) {
      //     const position = this.positions[characterIndex];
      //     ws.send(JSON.stringify({ type: 'login', name: data.name, x: position.x, y: position.y }));
      //   } else {
      //     ws.send(JSON.stringify({ type: 'error', message: 'Invalid character name' }));
      //   }
      // }
    })
    console.log('New client connected');
  }
  handeleloguin(){

  }
}
