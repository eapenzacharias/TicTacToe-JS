const player = (name, symbol, score = 0) => {
    return {
        name,
        symbol,
        score
    }
}

const game = (() => {
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const checkRow = () => {
        if (board[0] === board[1] && board[0] === board[2]) {
            return board[0];
          } else if (board[3] === board[4] && board[3] === board[5]) {
            return board[3];
          } else if (board[6] === board[7] && board[6] === board[8]) {
            return board[6];
          } else {
            return 0;
          }
    };

    const checkColumn = () => {
        if (board[0] === board[3] && board[0] === board[6]) {
          return board[0];
        } else if (board[1] === board[4] && board[1] === board[7]) {
          return board[1];
        } else if (board[2] === board[5] && board[2] === board[8]) {
          return board[2];
        } else {
          return 0;
        }
      };

      const checkDiagonal = () => {
        if (board[0] === board[4] && board[0] === board[8]) {
          return board[0];
        } else if (board[2] === board[4] && board[2] === board[6]) {
          return board[2];
        } else {
          return 0;
        }
      };

      const checkWinner = () => {
        if (checkRow() !== 0 || checkColumn() !== 0 || checkDiagonal() !== 0) {
          return checkRow() + checkColumn() + checkDiagonal();
        } else if (!board.includes(0)) {
          return 3;
        } else {
          return 0;
        }
      };

    return {
        board: () => board,
        move: (player, place) => board[place] = player,
        checkRow,
        checkColumn,
        checkDiagonal,
        checkWinner
    };
})();







//let boardDom = document.getElementById("board");

console.log(game.checkRow());

game.move(1, 0);
game.move(1, 3);
game.move(1, 6);
console.log(game.checkWinner());
//console.log(checkRow());
