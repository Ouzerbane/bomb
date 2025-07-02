export default class Rom {
   constructor() {
    this.id = uuidv4();
    this.players = [];
    this.state = 'waiting'; 
    this.map = this.createInitialMap();
    this.waitingInterval = null;
  }
}