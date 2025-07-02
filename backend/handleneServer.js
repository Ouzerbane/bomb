export class geme {
    constructor(port) {
        this.port = port;
        this.server = new WebSocket.Server({ port: this.port });

        this.characters = ['char1', 'char2', 'char3', 'char4'];
        this.positions = [
            { x: 1, y: 1 },
            { x: 1, y: 13 },
            { x: 13, y: 1 },
            { x: 13, y: 13 }
        ];

    }

}