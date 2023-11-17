const Gameboard = (function(){
    let board = ['','','','','','','','',''];
    const getBoard = ()=>board;

    const updateBoard = function(index,marker){
        board[index]=marker;
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

    const isFull = function(){
        return (!board.includes(''));
    }

    return {getBoard,updateBoard,placeMarker,printBoard,winCheck,isFull};
})();

const Player = function(name,marker){
    return {name,marker};
}

const displayController = (function(){
    const gridContainer = document.querySelector('.grid-container');

    const renderBoard = function(board=Gameboard.getBoard()){
        //Clearing gridContent before rendering board
        gridContainer.textContent='';

        for (let i=0;i<board.length;i++){
            const gridItem = document.createElement('div');
            const gridButton = document.createElement('button');
            const markerText = document.createElement('h1');

            gridItem.classList.add('grid-item');
            gridItem.id = i;
            markerText.classList.add('marker-text');

            markerText.textContent = board[i];

            gridButton.appendChild(markerText);
            gridItem.appendChild(gridButton);
            gridContainer.appendChild(gridItem);
        }
        
    }

    const placeMarker = function(marker) {
        // Add the event listener to each grid item
        for (let gridItem of gridContainer.children) {
            gridItem.addEventListener('click', gridItemClickHandler);
        }
        function gridItemClickHandler(event) {
            if (!event.target.textContent) {
                //index of the board array where the marker is to be inserted
                const index = +event.target.parentNode.id;
                Gameboard.updateBoard(index, marker);
                event.target.firstChild.textContent = marker;
                console.log(Gameboard.getBoard());

                /*Looping through each gridItem and removing event listener 
                from it so that user can place their marker in only one cell
                at a give time */
                for (let item of event.target.parentNode.parentNode.children){
                    item.removeEventListener('click', gridItemClickHandler);
                }
            }
        }
    }

    //This single div is being used to display both player turn and winner
    const displayBox = document.querySelector('.display-box');

    const displayCurrentPlayer = function(currentPlayer){
        displayBox.textContent = `Player ${currentPlayer.marker}'s turn`;
    }
    const displayWinner = function(currentPlayer){
        displayBox.textContent = `Player ${currentPlayer.marker} has won!`
    }
    const displayDrawMessage = function(){
        displayBox.textContent = 'This game ends in a draw!';
    }

    return {renderBoard,placeMarker,displayCurrentPlayer,displayWinner,displayDrawMessage}
})();

const Game = (function(){
    const player1 = Player('PLayer1','X');
    const player2 = Player('Player2','Y');
    const players = [player1,player2]
    
    //randomly assigning 1st turn to player 1 or 2
    let currentPlayer = players[Math.round(Math.random())];
    
    const switchTurn = function(){
        currentPlayer = currentPlayer===players[0]?players[1]:players[0];
    }

    const playRound = function(){
        
    }

    return {playRound}
})();
// Game.playRound();

// displayController.renderBoard()
// displayController.displayPlayerTurn();
// displayController.placeMarker('X'); 