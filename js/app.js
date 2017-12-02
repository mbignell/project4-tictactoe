// when page loads, start screen, hide board

// start screen elements
const startScreen = document.getElementById('start');
const startButton = document.getElementById('start_game');
startButton.setAttribute("onclick", `newGame()`);

// Board elements
const boardScreen = document.getElementById('board');
const player1 = document.getElementsByClassName('player1')[0];
const player2 = document.getElementsByClassName('player2')[0];
const gameBoxes = document.getElementsByClassName('box');
for(let i=0; i < gameBoxes.length; i++){
  gameBoxes[i].setAttribute("onclick", `playBox(this,${i})`);
};
let currentPlayer;
let boxesChecked = 0;
let boxesInPlay = [];
for (var i = 0; i < 9; i++) boxesInPlay.push(0);

// Finish screen elements
const finishScreen = document.getElementById('finish');
const message = document.getElementsByClassName('message')[0];
const newButton = document.getElementById('new_game');
newButton.setAttribute("onclick", `newGame()`);

// Showing / hiding screens functions
const hideAllScreens = () => {
  startScreen.style.display = "none";
  finishScreen.style.display = "none";
  boardScreen.style.display = "none";
}
const showScreen = {
  start: () => {
    hideAllScreens();
    startScreen.style.display = "";
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

// exCEEDs add their name

// when player clicks start or new game
function newGame() {
  //  EXCEEDs name is added to game
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

  //   start screen or end screen  disappears
  showScreen.board();
};

// game play

  // players can only click / hover on empty squares

  // The game ends when one player has three of their symbols in a row either horizontally, vertically or diagonally.
  // If all of the squares are filled and no players have three in a row, the game is a tie.

function playBox(selectedBox, boxNumber) {
  if (boxesInPlay[boxNumber] === 0) {
    boxesChecked++;

    boxesInPlay[boxNumber] = currentPlayer;
    console.log(boxesInPlay);

    // When the player clicks on an empty square, attach the class box-filled-1 (for O) or box-filled-2 (for X) to the square.
    if (currentPlayer === 1) {
      selectedBox.classList.add('box-filled-1');
      checkIfWon()
    } else {
      selectedBox.classList.add('box-filled-2');
      checkIfWon()
    };

    if (boxesChecked === 9) {
      finishGame("tie");
    };

    // switch active player
    if (currentPlayer === 1) {
      setPlayer(2);
    } else {
      setPlayer(1);
    };
  };
};

function checkIfWon() {
  if (boxesInPlay[0] > 0 && boxesInPlay[0] === boxesInPlay[1] && boxesInPlay[1] === boxesInPlay[2]) {
    finishGame(currentPlayer);
  } else if (boxesInPlay[0] > 0 && boxesInPlay[0] === boxesInPlay[3] && boxesInPlay[3] === boxesInPlay[6]) {
    finishGame(currentPlayer);
  } else if (boxesInPlay[1] > 0 && boxesInPlay[1] === boxesInPlay[4] && boxesInPlay[4] === boxesInPlay[7]) {
    finishGame(currentPlayer);
  } else if (boxesInPlay[2] > 0 && boxesInPlay[2] === boxesInPlay[5] && boxesInPlay[5] === boxesInPlay[8]) {
    finishGame(currentPlayer);
  } else if (boxesInPlay[3] > 0 && boxesInPlay[3] === boxesInPlay[4] && boxesInPlay[4] === boxesInPlay[5]) {
    finishGame(currentPlayer);
  } else if (boxesInPlay[6] > 0 && boxesInPlay[6] === boxesInPlay[7] && boxesInPlay[7] === boxesInPlay[8]) {
    finishGame(currentPlayer);
  } else if (boxesInPlay[0] > 0 && boxesInPlay[0] === boxesInPlay[4] && boxesInPlay[4] === boxesInPlay[8]) {
    finishGame(currentPlayer);
  } else if (boxesInPlay[2] > 0 && boxesInPlay[2] === boxesInPlay[4] && boxesInPlay[4] === boxesInPlay[6]) {
    finishGame(currentPlayer);
  }
}

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
    finishScreen.classList.remove('screen-win-two');
    finishScreen.classList.remove('screen-win-one');
    message.textContent = "It's a tie!";
  } else if (result === 1) {
    finishScreen.classList.remove('screen-win-tie');
    finishScreen.classList.remove('screen-win-two');
    finishScreen.classList.add('screen-win-one');
    message.textContent = "Winner: Player 1!";
  } else if (result === 2) {
    finishScreen.classList.remove('screen-win-tie');
    finishScreen.classList.add('screen-win-two');
    finishScreen.classList.remove('screen-win-one');
    message.textContent = "Winner: Player 2!";
  };
}

// if 1 player
 // computer randomly chooses a box and marks it's x or o

showScreen.start();
