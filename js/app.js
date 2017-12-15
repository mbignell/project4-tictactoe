// Global tracking variables
let numberOfPlayers = 0;
let currentPlayer = 1;
let player1name = '';
let player2name = '';
let instance = 1;

// Start screen variables / elements
const startScreen = document.getElementById('start');
const onePlayerButton = document.getElementById('button_oneplayer');
const twoPlayerButton = document.getElementById('button_twoplayer');
onePlayerButton.setAttribute("onclick", `setOnePlayer()`);
twoPlayerButton.setAttribute("onclick", `setTwoPlayer()`);

// Name screen elements
const nameScreen = document.getElementById('name_player');
const messageName = document.getElementsByClassName('message-name')[0];
const nameInput = document.getElementById('name');
nameInput.setAttribute("onKeyPress", `detectEnterKey(event)`);
const nameError = document.getElementById('error');
nameError.style.display = "none";
const startButton = document.getElementById('start_game');
startButton.setAttribute("onclick", `addNames()`);

// Board elements
const boardScreen = document.getElementById('board');
const player1 = document.getElementsByClassName('player1')[0];
const player2 = document.getElementsByClassName('player2')[0];
const gameBoxes = document.getElementsByClassName('box');
for(let i=0; i < gameBoxes.length; i++){
  gameBoxes[i].setAttribute("onclick", `playBox(this,${i})`);
};
let boxesChecked = 0;
let boxesInPlay = [];
for (var i = 0; i < 9; i++) boxesInPlay.push(0);

// Finish screen elements
const finishScreen = document.getElementById('finish');
const message = document.getElementsByClassName('message-end')[0];
const newButton = document.getElementById('new_game');
newButton.setAttribute("onclick", `newGame()`);

// Showing / hiding screens functions
const hideAllScreens = () => {
  startScreen.style.display = "none";
  nameScreen.style.display = "none";
  finishScreen.style.display = "none";
  boardScreen.style.display = "none";
}
const showScreen = {
  start: () => {
    hideAllScreens();
    startScreen.style.display = "";
  },
  name: () => {
    hideAllScreens();
    nameScreen.style.display = "";
    document.getElementsByTagName("input")[0].focus();
  },
  board: () => {
    hideAllScreens();
    boardScreen.style.display = "";
  },
  finish: () => {
    hideAllScreens();
    finishScreen.style.display = "";
  }
}

// Helper function that detects the enter key action on name inputs
function detectEnterKey(e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if(code == 13) { //Enter keycode
    addNames();
  }
}

// Sets up one player or two player scenarios
// -- numberOfPlayers value, the text on the name question, default computer name
function setOnePlayer() {
  numberOfPlayers = 1;
  player2name = "Computer";
  messageName.textContent = "What’s your name?";
  showScreen.name();
}
function setTwoPlayer() {
  numberOfPlayers = 2;
  messageName.textContent = "What’s the name of the first player?";
  startButton.textContent = "Save Name";
  startButton.setAttribute("onclick", `addNames()`);
  showScreen.name();
}

// Function to add names and:
// Start the game or reset the form for name 2
// Or throw an error
function addNames() {
  nameError.style.display = "none";
  if (nameInput.value === '') {
    console.log('please enter a name.');
    nameError.style.display = "block";
  } else if (numberOfPlayers === 1 && player1name === '') {
    player1name = nameInput.value;
    newGame()
  } else if (numberOfPlayers === 2 && instance === 1) {
    player1name = nameInput.value;
    instance ++
    messageName.textContent = "What’s the name of the second player?";
    startButton.textContent = "Save Name";
    nameScreen.classList.remove("screen-name-one");
    nameScreen.classList.add("screen-name-two");
    nameInput.value = '';
    document.getElementsByTagName("input")[0].focus();
  } else {
    player2name = nameInput.value;
    newGame();
  }
}

// When player clicks start or new game, board is cleaned and player is set
function newGame() {
  //  Name is added to name
  let player1text = player1.getElementsByClassName('playername')[0];
  player1text.textContent = player1name;
  let player2text = player2.getElementsByClassName('playername')[0];
  player2text.textContent = player2name;

  boxesChecked = 0;

  // clean board
  for(let i = 0; i < gameBoxes.length; i++){
    gameBoxes[i].classList.remove("box-filled-1");
    gameBoxes[i].classList.remove("box-filled-2");
    boxesInPlay[i] = 0;
  }
  // randomly assign an active player to start
  var randomPlayer = Math.floor(Math.random() * 2);
  currentPlayer = randomPlayer;
  setPlayer(randomPlayer);

  // If random player is the computer, computer plays
  if (numberOfPlayers === 1 && currentPlayer === 2) {
    computerPlay();
  };

  // start screen or end screen disappears
  showScreen.board();
};

// Game play
function playBox(selectedBox, boxNumber) {
  // If the box is free to be played
  if (boxesInPlay[boxNumber] === 0) {
    // add to total (to track if board is full)
    boxesChecked++;
    // Sets box to player's #
    boxesInPlay[boxNumber] = currentPlayer;
    // When the player clicks on an empty square, add their mark
    if (currentPlayer === 1) {
      selectedBox.classList.add('box-filled-1');
      checkIfWon();
    } else {
      selectedBox.classList.add('box-filled-2');
      checkIfWon();
    };
    // switch active player
    if (numberOfPlayers === 2) {
      if (currentPlayer === 1) {
        setPlayer(2);
      } else {
        setPlayer(1);
      };
    };
  };
};

// Random Variation of computer play
function computerPlay() {
  let i = Math.floor(Math.random() * 9);
  while (boxesInPlay[i] != 0) {
    console.log('choosing new');
    i = Math.floor(Math.random() * 9);
  }
  playBox(gameBoxes[i],i);
  setPlayer(1);
};

// The game ends when one player has three of their symbols in a row either horizontally, vertically or diagonally.
// If all of the squares are filled and no players have three in a row, the game is a tie.
function checkIfWon() {
  let box = boxesInPlay;
  if (box[0] > 0 && box[0] === box[1] && box[1] === box[2]) {
    finishGame(currentPlayer);
  } else if (box[0] > 0 && box[0] === box[3] && box[3] === box[6]) {
    finishGame(currentPlayer);
  } else if (box[1] > 0 && box[1] === box[4] && box[4] === box[7]) {
    finishGame(currentPlayer);
  } else if (box[2] > 0 && box[2] === box[5] && box[5] === box[8]) {
    finishGame(currentPlayer);
  } else if (box[3] > 0 && box[3] === box[4] && box[4] === box[5]) {
    finishGame(currentPlayer);
  } else if (box[6] > 0 && box[6] === box[7] && box[7] === box[8]) {
    finishGame(currentPlayer);
  } else if (box[0] > 0 && box[0] === box[4] && box[4] === box[8]) {
    finishGame(currentPlayer);
  } else if (box[2] > 0 && box[2] === box[4] && box[4] === box[6]) {
    finishGame(currentPlayer);
  } else if (boxesChecked === 9) {
    finishGame("tie");
  } else if (numberOfPlayers === 1 && currentPlayer === 1){
    currentPlayer = 2;
    computerPlay();
  }
};

// Swaps the player and classlists on relevant objects
function setPlayer(player) {
  if (player === 1) {
    player2.classList.remove('active');
    player1.classList.add('active');
    for(let i=0; i < gameBoxes.length; i++){
      if (boxesInPlay[i] === 0) {
        gameBoxes[i].classList.add('player1-hover');
        gameBoxes[i].classList.remove('player2-hover');
      } else {
        gameBoxes[i].classList.remove('player1-hover', 'player2-hover');
      }
    };
    currentPlayer = 1;
  } else {
    player1.classList.remove('active');
    player2.classList.add('active');
    for(let i=0; i < gameBoxes.length; i++){
      if (boxesInPlay[i] === 0) {
        gameBoxes[i].classList.remove('player1-hover');
        gameBoxes[i].classList.add('player2-hover');
      } else {
        gameBoxes[i].classList.remove('player1-hover', 'player2-hover');
      }
    };
    currentPlayer = 2;
  }
};

// When game ends, show results
function finishGame(result) {
  showScreen.finish();
  if (result === "tie") {
    finishScreen.classList.add('screen-win-tie');
    finishScreen.classList.remove('screen-win-two', 'screen-win-one');
    message.textContent = "It's a tie!";
  } else if (result === 1) {
    finishScreen.classList.remove('screen-win-tie','screen-win-two');
    finishScreen.classList.add('screen-win-one');
    message.textContent = `Winner: ${player1name}!`;
  } else if (result === 2) {
    finishScreen.classList.remove('screen-win-tie','screen-win-one');
    finishScreen.classList.add('screen-win-two');
    message.textContent = `Winner: ${player2name}!`;
  };
}

// when page loads, start screen, hide board
showScreen.start();
