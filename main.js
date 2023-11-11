const Gameboard = (function(){
    let board = ['','','','','Y','','','Y',''];

    const placeMarker = function(marker){
        console.log(marker);
        let index;
        do {
            index = +prompt('Where to put your marker');
        }while(!([0,1,2,3,4,5,6,7,8].includes(index)));
        board[index] = marker;
    }

    const printBoard = function(){
        console.log(' ',board[0],' | ',board[1],' | ',board[2],' | ',);
        console.log(' ',board[3],' | ',board[4],' | ',board[5],' | ',);
        console.log(' ',board[6],' | ',board[7],' | ',board[8],' | ',);
    }

    const winCheck = function(marker){
        const winCombinatinons = [
            [0,1,2],[3,4,5],[6,7,8], //Rows
            [0,3,6],[1,4,7],[2,5,8], //Columns
            [0,4,8],[2,4,6]          //Diagonals
        ]
        
        for (let combination of winCombinatinons){
            [a,b,c] = combination;
            if (board[a]===marker && board[b]===marker && board[c]===marker){
                return true;
            }
        }
        return false;
    }
    return {placeMarker,printBoard,winCheck};
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
