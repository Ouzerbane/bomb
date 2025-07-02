// Fully Refactored Bomberman Client Logic
// soft-w

let ws = null;
export function Ws() {
  ws = new WebSocket("ws://localhost:8080");
  LoginInitial();
  ws.onmessage = (event) => {
    let data = JSON.parse(event.data);
    console.log(data);
    
  }

}

function LoginInitial() {
  const gameBoard = document.getElementById("game");
  gameBoard.innerHTML = `
    <div class="container">
  <h2>Enter Your Nickname</h2>
  <input type="text" id="nickname" placeholder="Your name..." />
  <div class="error" id="error"></div>
  <button class="start-button">Start Game</button>

  </div>
  `;
  const startButton = document.querySelector(".start-button");
  startButton.addEventListener("click", handleStartButtonClick);

}
function handleStartButtonClick(event) {
  const nickname = document.getElementById("nickname").value;
  if (nickname) {
    ws.send(JSON.stringify({ type: "login", name: nickname }));
  }
}




// let ws = null;
// let currentPlayer = "";
// let life = 3;
// let coordinate = { x: 0, y: 0 };
// let start = { x: 0, y: 0 };
// let map = [];
// let playerNmbr = "";

// export function GameLogic() {
//   ws = new WebSocket("ws://localhost:8080");

//   LoginInitial(ws);

//   ws.onmessage = (event) => {
//     const data = JSON.parse(event.data);
//     switch (data.type) {
//       case "players":
//         renderPlayersList(data.players);
//         break;

//       case "mapUpdate":
//         updateTile(data.x, data.y, data.newTile);
//         break;

//       case "bomb-exploded":
//         removeBombVisual(data.x, data.y);
//         break;

//       case "waiting":
//         document.querySelector(
//           ".game_start"
//         ).innerHTML = `waiting for players... ${data.time}`;
//         break;

//       case "player-dead":

//         if (data.player === currentPlayer) {
//           showGameOver();
//         } else {
//           removeDeadPlayer(data.player);
//         }
//         break;

//       case "countdown":
//         document.querySelector(
//           ".game_start"
//         ).innerHTML = `Game will start in: ${data.time}`;
//         break;

//       case "countdown-stopped":
//         const gameStart = document.querySelector(".game_start");
//         gameStart.innerHTML = ``;
//         break;

//       case "error":
//         console.log(data.message);
//         break;

//       case "joined":
//         applyStyle("logik.css");
//         currentPlayer = data.nickname;
//         renderLobbyUI();
//         setupChatHandlers();
//         break;

//       case "start-game":
//         CreationMap(data);
//         break;

//       case "move":
//         move_player(data);
//         break;

//       case "bomb":
//         SetBomb(data);
//         break;

//       case "chat":
//         appendChatMessage(data.nickname, data.message);
//         break;
//     }
//   };
// }

// function showGameOver() {
//   const board = document.querySelector(".game-board");
//   if (board) {
//     board.innerHTML = `
//       <div class="game-over">
//         <h1>💀 Game Over 💀</h1>
//         <p>You have been eliminated.</p>
//       </div>
//     `;
//   }
// }


// function updateTile(x, y, newTile) {
//   const aldiv = document.querySelectorAll(".place");
//   const index = y * 15 + x;
//   const cell = aldiv[index];

//   // Remove all tile-type classes
//   cell.classList.remove("wall", "soft-wall", "empty");

//   // Update based on new tile type
//   switch (newTile) {
//     case "W":
//       cell.classList.add("wall");
//       break;
//     case "D":
//       cell.classList.add("soft-wall");
//       break;
//     default:
//       cell.classList.add("empty");
//   }
// }

// function removeDeadPlayer(nickname) {
//   const deadCell = document.querySelector(`#${nickname}`);
//   if (deadCell) {
//     deadCell.className = "place empty"; // Reset classes
//     deadCell.removeAttribute("id");
//     deadCell.innerHTML = "";
//   }
// }



// function applyStyle(href) {
//   let styleLink = document.querySelector(".styl");
//   if (!styleLink) {
//     styleLink = document.createElement("link");
//     styleLink.rel = "stylesheet";
//     styleLink.className = "styl";
//     document.head.appendChild(styleLink);
//   }
//   styleLink.href = href;
// }

// function renderLobbyUI() {
//   document.body.innerHTML = `
//     <div class="container">
//       <div class="list_user"></div>
//       <div class="chat_div">
//         <div class="chat_messages"><p>Welcome to Bomberman chat!</p></div>
//         <input type="text" id="chatInput" placeholder="Type your message...">
//         <button id="sendChat">Send</button>
//       </div>
//       <h1 class="game_start"></h1>
//     </div>`;
// }

// function renderPlayersList(players) {

//   const listUser = document.querySelector(".list_user");

//   listUser.innerHTML =
//     `<h1>Players online: ${players?.length}</h1>` +
//     players.map((p) => `<p>${p.nickname}</p>`).join("");
// }

// function appendChatMessage(nickname, message) {
//   const chatMessages = document.querySelector(".chat_messages");
//   const newMessage = document.createElement("p");
//   newMessage.textContent = `${nickname}: ${message}`;
//   chatMessages.appendChild(newMessage);
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// }

// function setupChatHandlers() {
//   setTimeout(() => {
//     const sendBtn = document.getElementById("sendChat");
//     const chatInput = document.getElementById("chatInput");

//     sendBtn.addEventListener("click", () => {
//       const message = chatInput.value.trim();
//       if (message && ws.readyState === WebSocket.OPEN) {
//         ws.send(
//           JSON.stringify({ type: "chat", nickname: currentPlayer, message })
//         );
//         chatInput.value = "";
//       }
//     });

//     chatInput.addEventListener("keydown", (e) => {
//       if (e.key === "Enter") sendBtn.click();
//     });
//   }, 100);
// }

// function removeBombVisual(x, y) {
//   const index = y * 15 + x;
//   const cell = document.querySelectorAll(".place")[index];
//   cell.classList.remove("bomb");
//   cell.innerHTML = "";

//   const bombCounter = document.querySelector(".bombe_conteur");
//   bombCounter.innerHTML = Number(bombCounter.innerHTML) + 1;
// }

// function LoginInitial(ws) {
//   document.querySelector("body").innerHTML = `
// <h1>Bomberman</h1>
// <div class="nakename">
//   <label for="nickname">Enter your nickname:</label>
//   <input type="text" id="nickname" placeholder="Nickname">
//   <button id="setNickname">Set Nickname</button>
// </div>
// `;

//   document.querySelector("#setNickname").addEventListener("click", () => {
//     const nickname = document.querySelector("#nickname").value;
//     ws.send(JSON.stringify({ type: "join", nickname }));
//   });
// }

// function CreationMap(opjet) {
//   const styleLink = document.querySelector(".styl");
//   styleLink.href = "style.css";

//   document.body.innerHTML = `
//     <h1>Bomberman Game</h1>
//     <div class="life">
//       <div class="life-item">
//         <img src="./heart.png" alt="Heart" class="heart" />
//         <span class="life-count">3</span>
//       </div>
//       <div class="life-item">
//         <img src="./bombe.png" alt="bombe" class="div_bombe_conteur" />
//         <span class="bombe_conteur">1</span>
//       </div>
//       <div class="life-item">
//         <img src="./Flames.png" alt="Flames" class="div_Flames_conteur" />
//         <span class="Flames_conteur">0</span>
//       </div>
//       <div class="life-item">
//         <img src="./speed.png" alt="speed" class="div_speed_conteur" />
//         <span class="speed_conteur">0</span>
//       </div>
//     </div>

//     <div class="game-board" id="game"></div>
//   `;

//   map = opjet.map; // store global copy if needed
//   drawMap(map); // draw UI from map data
//   startGame(opjet); // start placing players
// }

// export function drawMap(map) {
//   const gameBoard = document.getElementById("game");
//   gameBoard.innerHTML = "";

//   for (let y = 0; y < map.length; y++) {
//     for (let x = 0; x < map[y].length; x++) {
//       const place = document.createElement("div");
//       place.classList.add("place");

//       switch (map[y][x]) {
//         case "W":
//           place.classList.add("wall");
//           break;
//         case "D":
//           place.classList.add("soft-wall");
//           break;
//         default:
//           place.classList.add("empty");
//       }

//       gameBoard.appendChild(place);
//     }
//   }
// }

// function SetBomb(data) {
//   let { x, y } = data;
//   const aldiv = document.querySelectorAll(".place");
//   const index = y * 15 + x;
//   const cell = aldiv[index];

//   if (!cell.classList.contains("bomb")) {
//     cell.classList.add("bomb");
//     cell.innerHTML = "💣";

//     // Decrease bomb counter (only if this is the local player)
//     if (data.player === currentPlayer) {
//       const bombCounter = document.querySelector(".bombe_conteur");
//       bombCounter.innerHTML = Number(bombCounter.innerHTML) - 1;
//     }
//   }
// }

// function move_player(obj) {
//   const aldiv = document.querySelectorAll(".place");
//   // Remove player from current cell (if not caused by a bomb respawn)
//   if (!obj.bomb) {
//     const prevPlayer = document.querySelector(`.${obj.playerNmbr}`);
//     if (prevPlayer) {
//       prevPlayer.classList.remove(obj.playerNmbr);
//       prevPlayer.classList.add("empty");
//       prevPlayer.removeAttribute("id");
//       prevPlayer.innerHTML = "";
//     }
//   }
//   if (!obj.position && currentPlayer === obj.player) {
//   }

//   // Calculate new position
//   const index = obj.position.y * 15 + obj.position.x;
//   const newCell = aldiv[index];

//   // Add player to new cell
//   newCell.classList.remove("empty");
//   newCell.classList.add(obj.playerNmbr);
//   newCell.id = obj.player;
//   newCell.innerHTML = ""; // Optional: add avatar or content if needed

//   // If this is the current player, update coordinate tracking
//   if (obj.player === currentPlayer) {
//     coordinate.x = obj.position.x;
//     coordinate.y = obj.position.y;
//   }
// }

// function startGame(objet) {
//   const gameBoard = document.getElementById("game");
//   let nmberofPlayers = 1;
//   objet.players.forEach((player) => {
//     let position = player.position.y * 15 + player.position.x;
//     let palyer_div = gameBoard.children[position];
//     palyer_div.classList.remove("empty");
//     palyer_div.classList.add("player" + String(nmberofPlayers));
//     if (player.nickname == currentPlayer) {
//       playerNmbr = "player" + String(nmberofPlayers);
//       coordinate.x = player.position.x;
//       coordinate.y = player.position.y;
//       start.x = player.position.x;
//       start.y = player.position.y;
//     }
//     palyer_div.id = player.nickname;
//     nmberofPlayers++;
//   });
// }

// document.addEventListener("keydown", (e) => {
//   if (map.length === 0) return;

//   let direction = null;
//   let newX = coordinate.x;
//   let newY = coordinate.y;

//   if (e.key === " ") {
//     const aldiv = document.querySelectorAll(".place");
//     const currentTile = aldiv[coordinate.y * 15 + coordinate.x];

//     const tileType = map[coordinate.y][coordinate.x];

//     // Block bomb if:
//     // - On a wall or soft wall
//     // - Already a bomb there
//     if (
//       currentTile.classList.contains("wall") ||
//       currentTile.classList.contains("soft-wall") ||
//       currentTile.classList.contains("bomb")
//     )
//       return;

//     const sender = {
//       type: "bomb",
//       x: coordinate.x,
//       y: coordinate.y,
//       playerNmbr,
//       player: currentPlayer,
//     };

//     ws.send(JSON.stringify(sender));
//     return;
//   }

//   if (e.key === "ArrowUp") {
//     direction = "up";
//     newY--;
//   }
//   if (e.key === "ArrowDown") {
//     direction = "down";
//     newY++;
//   }
//   if (e.key === "ArrowLeft") {
//     direction = "left";
//     newX--;
//   }
//   if (e.key === "ArrowRight") {
//     direction = "right";
//     newX++;
//   }

//   // Boundary check
//   if (direction && newX >= 0 && newX < 15 && newY >= 0 && newY < 15) {
//     const targetCellType = map[newY][newX];
//     const aldiv = document.querySelectorAll(".place");
//     const targetDiv = aldiv[newY * 15 + newX];

//     // Blocked if wall, destructible block, or occupied by another player
//     const isBlocked =
//       // targetCellType === "W" ||
//       // targetCellType === "D" ||
//       targetDiv.classList.contains("soft-wall") ||
//       targetDiv.classList.contains("bomb") ||
//       targetDiv.classList.contains("wall") ||
//       targetDiv.classList.contains("player1") ||
//       targetDiv.classList.contains("player2") ||
//       targetDiv.classList.contains("player3") ||
//       targetDiv.classList.contains("player4");

//     if (!isBlocked && ws.readyState === WebSocket.OPEN) {
//       ws.send(
//         JSON.stringify({
//           type: "move",
//           direction,
//           playerNmbr,
//           player: currentPlayer,
//         })
//       );
//     }
//   }
// });
