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

    const move = (player, place) => {
        if (player == 1) {
            let cell = document.getElementById(place);
            cell.innerHTML = "X";
        } else {
            let cell = document.getElementById(place);
            cell.innerHTML = "O";
        }
        board[place] = player;
    }

    const clearBoard = () => {
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    return {
        board: () => board,
        move,
        checkWinner,
        clearBoard
    };
})();

function switchTurns(player) {
    if (player == 1) {
        return 2;
    } else {
        return 1;
    }
}

function addCellEvent(currentPlayer) {
    for (let i = 0; i < 9; i++) {
        let cell = document.getElementById(`${i}`)
        cell.addEventListener("click", function() {
                board = game.board();
                if (board[i] == 0) {
                    cell.removeEventListener("click", game.move(currentPlayer, i));
                    if (game.checkWinner() == 0) {
                        return currentPlayer = switchTurns(currentPlayer);
                    } else if (game.checkWinner() == 1) {
                        decide();
                        //} else if (game.checkWinner() == 2) {
                        //    console.log('player 2 wins!');
                        //} else {
                        //    console.log("DRAW");
                        //}
                    }
                });
        }
    }

    function decide(i = game.checkWinner()) {
        msgBoard = document.getElementById("winner");

        if (i == 1) {
            message.appendChild("<h3>Player 1 Wins!!!</h3>");
        } else if (i.checkWinner() == 2) {
            console.log('player 2 wins!');
        } else {
            console.log("DRAW");
        }

    }

    function gameStarter() {
        let playerone = document.createElement("form");
        document.getElementById("playerone").appendChild(playerone);
        let PlayerOneName = document.createElement("input");
        PlayerOneName.setAttribute("type", "text");
        PlayerOneName.setAttribute("id", "playeronename");
        playerone.appendChild(PlayerOneName);
        let playertwo = document.createElement("form");
        document.getElementById("playertwo").appendChild(playertwo);
        let PlayerTwoName = document.createElement("input");
        PlayerTwoName.setAttribute("id", "playertwoname");
        PlayerTwoName.setAttribute("type", "text");
        playertwo.appendChild(PlayerTwoName);
        let startGame = document.createElement("button");
        startGame.onclick = () => RunnerFunction();
        startGame.appendChild(document.createTextNode("Start Game"));
        document.getElementById("player-details").appendChild(startGame);
    }

    function RunnerFunction() {
        let playerOneName = "Player 1";
        let playerTwoName = "Plater 2";
        if (document.getElementById("playeronename").value !== "") {
            playerOneName = document.getElementById("playeronename").value;
        }
        if (document.getElementById("playertwoname").value !== "") {
            playerTwoName = document.getElementById("playertwoname").value;
        }
        const player1 = player(playerOneName, 1);
        const player2 = player(playerTwoName, 2);
        let currentPlayer = 1;
        game.board();
        addCellEvent(currentPlayer);
    }


    //let boardDom = document.getElementById("board");

    gameStarter();
    //game.move(1, 0);
    //game.move(1, 3);
    //game.move(1, 6);
    console.log(game.checkWinner());
    //console.log(checkRow());