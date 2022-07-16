/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    if (board[position] == ' '){
        board[position] = mark;   
    }
        
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    drawBoard = {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9'
    };

    for(let i in drawBoard){

        if (board[i] != ' '){

            drawBoard[i] = board[i];
        }
    }

    console.log('\n' +
        ' ' + drawBoard[1] + ' | ' + drawBoard[2] + ' | ' + drawBoard[3] + '\n' +
        ' ---------\n' +
        ' ' + drawBoard[4] + ' | ' + drawBoard[5] + ' | ' + drawBoard[6] + '\n' +
        ' ---------\n' +
        ' ' + drawBoard[7] + ' | ' + drawBoard[8] + ' | ' + drawBoard[9] + '\n');


}

// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied

function validateMove(position) {
    let pos = parseInt(position);

    if (pos <= 9 && pos >= 1) {
        if (board[pos] == ' ') {
            return true;
        }
    }
    return false;
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    // Horizontal
    [1, 2, 3],
    [4, 5, 6], 
    [7, 8, 9], 
    // Vertical
    [1, 4, 7],
    [2, 5, 8], 
    [3, 6, 9], 
    // Diagonal
    [1, 5, 9], 
    [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {

    for (let com of winCombinations){
        if(board[com[0]] == player && board[com[1]] == player && board[com[2]] == player ){
            return true;
        }
    }
    return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for (let val in board){
        if(board[val] == ' '){
            return false;
        }
    }
    return true;

}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
/* 
1: Take input from user
2. Check if current player turn is a validate move or not (validateMove)
3. if not then give him chance to change the input
4. if it is valid then mark the board with the current move
5. Ends game in case array is full or player wins
And as well as the while loop at line number 160 is concerned
It involves following steps:
1: call the playTurn function
2: call printBoard function
3: In case of winner identifies we need to announce the winner
4: Otherwise we have to change the winner From O to X, and X to O
*/

function playTurn(player) {

    let move = prompt(player + "'s turn, input: ");

    while(!validateMove(move)){

        console.log("Invalid Input, Try Again!! ");

        move = prompt(player + "'s turn, input: ");

    }

    // mark the board with the input

    markBoard(move, player);

    if(checkWin(player) || checkFull()){

        winnerIdentified = true;

    }
    
}
/*
We will perform following steps to write the restart game fucntion:
1: Ask user to enter the input from yes/No
2: Loop over the input until it exits the control
3: need to check the input if it is yes then re declare the board array and break the loop
4: need to check the input if it is no then just break the loop and exit the whole control
5: need to check the input if is not either yes / no then ask user to input again
*/
function restartGame(){

    let restart = prompt("Do you want to restart the game? Yes/No: ");
    while(restart){
        if(restart.toLowerCase() == 'yes'){
            board = {
                1: ' ', 2: ' ', 3: ' ',
                4: ' ', 5: ' ', 6: ' ',
                7: ' ', 8: ' ', 9: ' '
            };
            winnerIdentified = false;
            break;

        }else if(restart.toLowerCase() == 'no'){
            console.log('Thanks for Playing, see you again!!! ');
            winnerIdentified = true;
            break;
        }else{
            console.log('Oops Invalid input, Please enter again!!! ');
            restart = prompt("Do you want to restart the game? Yes/No: ");
        }

    }
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false
let currentTurnPlayer = 'X'
/*
MAin entrance of the game
Steps:
1: call the playTurn function
2: call printBoard function
3: In case of winner identifies we need to announce the winner
4: Otherwise we have to change the winner From O to X, and X to O
*/
while (!winnerIdentified){
    playTurn(currentTurnPlayer);
    printBoard();
    // feel free to add logic here if needed, e.g. announcing winner or tie

    if(winnerIdentified){

        if(checkWin(currentTurnPlayer)){

            console.log('Hurray!! Winner is: '+ currentTurnPlayer+ ' \n Game Ends Here! ');
            // restart game code goes here
            restartGame();

        }else{

            console.log('Game Tie, !! End Game !! ');
            // restart game code goes here
            restartGame();

        }

    }else{
        // Here in else part we are changing the player turn from X to O and O to X

        if (currentTurnPlayer == 'O'){
            currentTurnPlayer = 'X';
        }else{
            currentTurnPlayer = 'O';
        }

    }
    // if (checkWin(player) === true) {
    // return "Congrats!" + currentTurnPlayer + "Win!" 
    // }
    // else{
    //     return "Draw!"
    // }

}

/*
We need to check following 3 scnerios:
1: Winning condition for X/O player (passed)
2: Tie situtaion where no one wins
3: Invalid/duplicate input (passed)
*/

// Bonus Point: Implement the feature for the user to restart the game after a tie or game over

// We need to restart this game only in 2 conditions 
// 1: Tie situation
// 2: Winning condition
     