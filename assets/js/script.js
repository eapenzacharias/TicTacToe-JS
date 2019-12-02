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
        let winner = document.getElementById("winner"); 
        for (let i = 0; i < 9; i++){
            let cell = document.getElementById(`${i}`);
            cell.innerHTML = '';
        }
        winner.innerHTML = "";
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
        let cell = document.getElementById(`${i}`);
        cell.addEventListener("click", function() {
                board = game.board();
                if (board[i] == 0) {
                    cell.removeEventListener("click", game.move(currentPlayer, i));
                    if (game.checkWinner() == 0) {
                        return currentPlayer = switchTurns(currentPlayer);
                    } else {
                        decide(game.checkWinner());
                        //} else if (game.checkWinner() == 2) {
                        //    console.log('player 2 wins!');
                        //} else {
                        //    console.log("DRAW");
                        //}
                    }
                }});
    
}}
    

    function decide(i) {
        let msgBoard = document.getElementById("winner");
        let header = document.createElement("h3");
        msgBoard.appendChild(header);
        if (i == 1) {
            var winnerText = document.createTextNode(`${player1.name} WINS!`);
        } else if (i == 2) {
            var winnerText = document.createTextNode(`${player2.name} WINS!`);
        } else {
            var winnerText = document.createTextNode(`DRAW`);
        }
        header.appendChild(winnerText);
        //gameStarter();
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
    var player1;
    var player2;
    function RunnerFunction() {
        game.clearBoard();
        let playerOneName = "Player 1";
        let playerTwoName = "Player 2";
        if (document.getElementById("playeronename").value !== "") {
            playerOneName = document.getElementById("playeronename").value;
        }
        if (document.getElementById("playertwoname").value !== "") {
            playerTwoName = document.getElementById("playertwoname").value;
        }
         player1 = player(playerOneName, 1);
         player2 = player(playerTwoName, 2);
        let currentPlayer = 1;
        game.board();
        addCellEvent(currentPlayer);
    }


    //let boardDom = document.getElementById("board");

    gameStarter();
