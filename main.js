const Gameboard = (function(){
    let board = ['','','','','','','','',''];
    const getBoard = ()=>board;

    const placeMarker = function(marker){
        let index;
        //Checking that index is in range and unoccupied
        do {
            index = +prompt('Where to put your marker');
        }while(![0,1,2,3,4,5,6,7,8].includes(index) || board[index]!==' ');

        board[index] = marker;
    }

    const updateBoard = function(index,marker){
        board[index]=marker;
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

    const isFull = function(){
        return (!board.includes(' '));
    }

    return {getBoard,updateBoard,placeMarker,printBoard,winCheck,isFull};
})();

const Player = function(name,marker){
    return {name,marker};
}


const Game = (function(){
    const player1 = Player('PLayer1','X');
    const player2 = Player('Player2','Y');
    const players = [player1,player2]
    
    let currentPlayer = null;

    //randomly assigning 1st turn to player 1 or 2
    const assignTurn = function(){
        return players[Math.round(Math.random())];
    }

    const switchTurn = function(){
        currentPlayer = currentPlayer===players[0]?players[1]:players[0];
    }

    const playRound = function(){
        let win = false;
        currentPlayer = assignTurn();
        console.log(`${currentPlayer.name} goes first`);
        Gameboard.printBoard();
        while (!Gameboard.isFull()){
            Gameboard.placeMarker(currentPlayer.marker);
            Gameboard.printBoard();
            if (Gameboard.winCheck(currentPlayer.marker)){
                win = true;
                console.log(`${currentPlayer.name} has won!`);
                break;
            }
            switchTurn();
        }
        if (!win){
            console.log('This round ends in a draw!');
        }
    }

    return {playRound}
})();
// Game.playRound();

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

    return {renderBoard,placeMarker}
})();
displayController.renderBoard()
displayController.placeMarker('X'); 