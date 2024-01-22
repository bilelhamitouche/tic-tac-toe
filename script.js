
// gameBoard object
const gameBoard = (() => {
  // board variable
  const board = ["", "", "", "", "", "", "", "", ""];

  // clearing the board
  const clearBoard = () => {
    for(let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  // access the board outside of the gameBoard object
  const getBoard = () => board;

  // count markers in the board
  const countMarkers = () => {

    let count = 0;

    board.forEach(cell => {
      if (cell === 'X' || cell === 'O') count++;
    })
    return count;
  };

  return { getBoard, clearBoard, countMarkers };
  
})();


// player factory
const player = function (name, marker) {
  return { name, marker };
};


// game controller object
const gameController = (() => {

  // start game function
  const startGame = (player1, player2) => {
    const main = document.querySelector('main');
    main.style.display = 'grid';
  };

  return { startGame };
  
})();

const displayController = (() => {


  // grabbing all DOM elements
  const main = document.querySelector('main');
  const startGameBtn = document.querySelector('.start-game-btn');
  const restartGameBtn = document.querySelector('.restart-game-btn');
  const cells = Array.from(document.querySelectorAll('.cell'));
  const submit = document.querySelector('.start-game-btn');
  const playerOneName = document.querySelector('#player1').value;
  const playerTwoName = document.querySelector('#player2').value;
  const playerTurn = document.querySelector('.turn');
  const result = document.querySelector('.result');
  const resultHeader = document.querySelector('.result-header');
  const newGameBtn = document.querySelector('.new-game-btn');
  const dialog = document.querySelector('dialog');

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ];

  // setting some variables
  let player1 = player(playerOneName, 'X');
  let player2 = player(playerTwoName, 'O');
  const board = gameBoard.getBoard();
  let activePlayer = player1;
  playerTurn.innerHTML = `Player ${activePlayer.name}'s turn`;

  // event handler for DOM elements
  const eventHandler = () => {
    cells.forEach(cell => {
      cell.addEventListener('click', displayMarker);
    })
    startGameBtn.addEventListener('click', gameController.startGame);
    restartGameBtn.addEventListener('click', restartGame);
    newGameBtn.addEventListener('click', () => {
      result.style.display = 'none';
      gameBoard.clearBoard();
      clearBoard();
      dialog.showModal();
    });
    window.onload = (e) => {
      dialog.showModal();
    };

  };

  // check for win
  const checkForWin = (cells) => {
    for(let wincon of winConditions) {
      if (cells[wincon[0]].innerHTML != '' && cells[wincon[1]].innerHTML != '' && cells[wincon[2]].innerHTML != '') {
	if (cells[wincon[0]].innerHTML == cells[wincon[1]].innerHTML && cells[wincon[1]].innerHTML == cells[wincon[2]].innerHTML) {
	  return true;
	}
      }
    }
  }; 

  const checkForDraw = () => {
    if (gameBoard.countMarkers() == 9) {
      return true;
    }
  };


  // change turns
  const changeTurns = () => {
    if (gameBoard.countMarkers() % 2) activePlayer = player2;
    if (!(gameBoard.countMarkers() % 2)) activePlayer = player1;
  };

  // displayMarker function
  const displayMarker = (e) => {
    const index = e.target.dataset.index;
    if (board[index]) return;
    board[index] = activePlayer.marker;
    e.target.innerHTML = activePlayer.marker;
    if (checkForWin(cells)) {
      main.style.display = 'none';
      resultHeader.innerHTML = `${activePlayer.name} is winner`;
      result.style.display = 'grid';
    }
    if (checkForDraw()) {
      main.style.display = 'none';
      resultHeader.innerHTML = `It's a draw`;
      result.style.display = 'grid';
    } else {
      changeTurns();
      displayTurn();
    }
  } 

  const displayTurn = () => {
    playerTurn.innerHTML = `Player ${activePlayer.name}'s turn`;
  };

  // clear board
  const clearBoard = () => {
    cells.forEach(cell => cell.innerHTML = '');
  };

  // restart game
  const restartGame = () => {
    gameBoard.clearBoard();
    clearBoard();
    changeTurns();
    displayTurn();
    gameController.startGame(player1, player2);
  };

  // call eventHandler function
  eventHandler();
  
})();

