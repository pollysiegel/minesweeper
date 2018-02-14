'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Minesweeper for Codecademy class
 */

var Game = function () {
    function Game(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Game);

        this._numberOfRows = numberOfRows;
        this._numberOfColumns = numberOfColumns;
        this._numberOfBombs = numberOfBombs;
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    _createClass(Game, [{
        key: 'playMove',
        value: function playMove(rowIndex, columnIndex) {

            this._board.flipTile(rowIndex, columnIndex);

            if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
                console.log('BOOM! You lose -- try again! \n');
            } else if (!this._board.hasSafeTiles()) {
                console.log('YOU WIN!');
            } else {
                console.log('Current Board: \n' + this._board.print());
            }
        }
    }]);

    return Game;
}();

var Board = function () {
    function Board(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Board);

        this._numberOfRows = numberOfRows;
        this._numberOfColumns = numberOfColumns;
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    _createClass(Board, [{
        key: 'flipTile',
        value: function flipTile(rowIndex, columnIndex) {

            if (!this.playerBoard[rowIndex][columnIndex] === ' ') {
                console.log('This tile has already been flipped!');
            } else if (this.bombBoard[rowIndex][columnIndex] === 'B') {
                this.playerBoard[rowIndex][columnIndex] = 'B';
            } else {
                this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
            }

            this._numberOfTiles--;
        }
    }, {
        key: 'getNumberOfNeighborBombs',
        value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
            var _this = this;

            var neighborOffset = [[-1, 0], [-1, 1], [-1, -1], [1, 0], [1, -1], [0, 1], [0, -1], [1, 1]];

            var numBombs = 0;

            neighborOffset.forEach(function (offset) {
                var neighborRowIndex = offset[0] + rowIndex;
                var neighborColumnIndex = offset[1] + columnIndex;

                if (neighborRowIndex >= 0 && neighborRowIndex < _this._numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < _this._numberOfColumns) {
                    if (_this.bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                        numBombs++;
                    }
                }
            });

            return numBombs;
        }
    }, {
        key: 'hasSafeTiles',
        value: function hasSafeTiles() {
            return this._numberOfTiles != this._numberOfBombs;
        }
    }, {
        key: 'print',
        value: function print() {
            return this.playerBoard.map(function (row) {
                return row.join(' | ');
            }).join('\n');
        }
    }, {
        key: 'printBombBoard',
        value: function printBombBoard() {
            return this.bombBoard.map(function (row) {
                return row.join(' | ');
            }).join('\n');
        }
    }, {
        key: 'numberOfTiles',
        get: function get() {
            return this._numberOfTiles;
        }
    }, {
        key: 'playerBoard',
        get: function get() {
            return this._playerBoard;
        }
    }, {
        key: 'bombBoard',
        get: function get() {
            return this._bombBoard;
        }
    }], [{
        key: 'generatePlayerBoard',
        value: function generatePlayerBoard(numRows, numColumns) {
            var emptyBoard = [];

            for (var rowNum = 0; rowNum < numRows; rowNum++) {
                var emptyRow = [];

                for (var colNum = 0; colNum < numColumns; colNum++) {
                    emptyRow.push(' ');
                }

                emptyBoard.push(emptyRow);
            }

            return emptyBoard;
        }
    }, {
        key: 'generateBombBoard',
        value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
            var board = [];
            var numberOfBombsPlaced = 0;

            for (var rowNum = 0; rowNum < numberOfRows; rowNum++) {
                var row = [];
                for (var colNum = 0; colNum < numberOfColumns; colNum++) {
                    row.push(null);
                }
                board.push(row);
            }

            var bombRow = void 0,
                bombCol = -1;
            var randomInt = function randomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            };

            while (numberOfBombsPlaced < numberOfBombs) {
                bombRow = randomInt(numberOfRows);
                bombCol = randomInt(numberOfColumns);

                /* Account for already-placed bombs */
                if (board[bombRow][bombCol] != 'B') {
                    board[bombRow][bombCol] = 'B';
                    numberOfBombsPlaced++;
                }
            }
            return board;
        }
    }]);

    return Board;
}();

/* Return a number between 0 and max */

/*
const g = new Game(3, 3, 4);
console.log(g._board.printBombBoard());

g.playMove(1,0);

g.playMove(1,0);
*/