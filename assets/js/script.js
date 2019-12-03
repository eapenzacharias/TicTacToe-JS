const player = (name, symbol, score = 0) => ({
  name,
  symbol,
  score,
});

let playerOneName = 'Player 1';
let playerTwoName = 'Player 2';
const player1 = player('Player 1', 1, 0);
const player2 = player('Player 2', 2, 0);

const game = (() => {
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const checkRow = () => {
    if (board[0] === board[1] && board[0] === board[2] && board[0] !== 0) {
      return board[0];
    }
    if (board[3] === board[4] && board[3] === board[5] && board[3] !== 0) {
      return board[3];
    }
    if (board[6] === board[7] && board[6] === board[8] && board[6] !== 0) {
      return board[6];
    }
    return 0;
  };

  const checkColumn = () => {
    if (board[0] === board[3] && board[0] === board[6] && board[0] !== 0) {
      return board[0];
    }
    if (board[1] === board[4] && board[1] === board[7] && board[1] !== 0) {
      return board[1];
    }
    if (board[2] === board[5] && board[2] === board[8] && board[2] !== 0) {
      return board[2];
    }
    return 0;
  };

  const checkDiagonal = () => {
    if (board[0] === board[4] && board[0] === board[8] && board[0] !== 0) {
      return board[0];
    }
    if (board[2] === board[4] && board[2] === board[6] && board[2] !== 0) {
      return board[2];
    }
    return 0;
  };

  const checkWinner = () => {
    if (checkRow() !== 0 || checkColumn() !== 0 || checkDiagonal() !== 0) {
      return checkRow() + checkColumn() + checkDiagonal();
    }
    if (!board.includes(0)) {
      return 3;
    }
    return 0;
  };

  const move = (player, place) => {
    if (player === 1) {
      const cell = document.getElementById(place);
      cell.innerHTML = 'X';
    } else {
      const cell = document.getElementById(place);
      cell.innerHTML = 'O';
    }
    board[place] = player;
  };

  const clearBoard = () => {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const winner = document.getElementById('winner');
    for (let i = 0; i < 9; i += 1) {
      const cell = document.getElementById(`${i}`);
      cell.innerHTML = '';
    }
    winner.innerHTML = '';
  };

  const fillBoard = () => {
    board = [9, 9, 9, 9, 9, 9, 9, 9, 9];
  };

  return {
    board: () => board,
    move,
    checkWinner,
    clearBoard,
    fillBoard,
  };
})();

function switchTurns(player) {
  if (player === 1) {
    document.getElementById('board').style.background = '#00c86a';
    document.getElementById('chance').innerHTML = `${playerTwoName}'s turn`;
    return 2;
  }
  document.getElementById('board').style.background = '#c88300';
  document.getElementById('chance').innerHTML = `${playerOneName}'s turn`;
  return 1;
}

function decide(i) {
  const msgBoard = document.getElementById('winner');
  const header = document.createElement('h3');
  game.fillBoard();
  let winnerText = '';
  msgBoard.appendChild(header);
  if (i === 1) {
    winnerText = document.createTextNode(`${player1.name} WINS!`);
    player1.score += 1;
    document.getElementById('player1-score').innerHTML = `${player1.score}`;
  } else if (i === 2) {
    winnerText = document.createTextNode(`${player2.name} WINS!`);
    player2.score += 1;
    document.getElementById('player2-score').innerHTML = `${player2.score}`;
  } else {
    winnerText = document.createTextNode('DRAW');
  }
  header.appendChild(winnerText);
}

function addCellEvent(currentPlayer) {
  for (let i = 0; i < 9; i += 1) {
    const cell = document.getElementById(`${i}`);
    cell.addEventListener('click', () => {
      const board = game.board();
      if (board[i] === 0) {
        cell.removeEventListener('click', game.move(currentPlayer, i));
        if (game.checkWinner() === 0) {
          currentPlayer = switchTurns(currentPlayer);
          return currentPlayer;
        }
        decide(game.checkWinner());
      }
    });
  }
}

function scoreBoard() {
  const scorePlayer1 = document.getElementById('player1-score');
  const scorePlayer2 = document.getElementById('player2-score');
  const onesName = document.getElementById('onesname');
  const twosName = document.getElementById('twosname');
  scorePlayer1.innerHTML = `${player1.score}`;
  scorePlayer2.innerHTML = `${player2.score}`;
  onesName.innerHTML = `${playerOneName}: &nbsp;`;
  twosName.innerHTML = `${playerTwoName}: &nbsp;`;
}


function RunnerFunction() {
  if (document.getElementById('input-player1').value !== '') {
    player1.name = document.getElementById('input-player1').value;
    playerOneName = player1.name;
  }
  if (document.getElementById('input-player2').value !== '') {
    player2.name = document.getElementById('input-player2').value;
    playerTwoName = player2.name;
  }
  document.getElementById('board').style.background = '#c88300';
  document.getElementById('chance').innerHTML = `${playerOneName}' turn`;
  scoreBoard();
  game.clearBoard();
  const currentPlayer = 1;
  game.board();
  addCellEvent(currentPlayer);
}

function gameStarter() {
  const playerone = document.createElement('form');
  document.getElementById('playerone').appendChild(playerone);
  const inputOneName = document.createElement('input');
  inputOneName.setAttribute('type', 'text');
  inputOneName.setAttribute('id', 'input-player1');
  inputOneName.setAttribute('placeholder', 'Name of Player 1');
  playerone.appendChild(inputOneName);

  const playertwo = document.createElement('form');
  document.getElementById('playertwo').appendChild(playertwo);
  const inputTwoName = document.createElement('input');
  inputTwoName.setAttribute('type', 'text');
  inputTwoName.setAttribute('id', 'input-player2');
  inputTwoName.setAttribute('placeholder', 'Name of Player 2');
  playertwo.appendChild(inputTwoName);

  const startGame = document.createElement('button');
  startGame.onclick = () => RunnerFunction();
  startGame.appendChild(document.createTextNode('START GAME'));
  document.getElementById('player-details').appendChild(startGame);
  startGame.onclick = () => RunnerFunction();
}

gameStarter();