// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import Board from './board';

class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfRows = numberOfRows;
        this._numberOfColumns = numberOfColumns;
        this._numberOfBombs = numberOfBombs;
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    playMove(rowIndex, columnIndex) {

        this._board.flipTile(rowIndex, columnIndex);

        if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
            console.log('BOOM! You lose -- try again! \n');
        } else if (!this._board.hasSafeTiles()) {
            console.log('YOU WIN!');
        } else {
            console.log('Current Board: \n' + this._board.print());
        }
    }
}

