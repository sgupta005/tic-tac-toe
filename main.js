const Gameboard = (function(){
    let board = ['','','','','','','','',''];

    const printBoard = function(){
        console.log(board[0],' | ',board[1],' | ',board[2],' | ',);
        console.log(board[3],' | ',board[4],' | ',board[5],' | ',);
        console.log(board[6],' | ',board[7],' | ',board[8],' | ',);
    }
    return {printBoard};
})();

const Player = function(marker){
    return {marker};
}

const Game = (function(){
    const player1 = Player('X');
    const player2 = Player('Y');
    const players = [player1,player2]
    
    let currentPlayer = null;

    //randomly assing 1st turn to player 1 or 2
    const assignTurn = function(){
        console.log(players);
        currentPlayer = players[Math.round(Math.random())];
    }

    const switchTurn = function(){
        currentPlayer = currentPlayer===players[0]?players[1]:players[0];
    }


    return {}
})();
