export class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfRows = numberOfRows;
        this._numberOfColumns = numberOfColumns;
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    get numberOfTiles() {
        return this._numberOfTiles;
    }

    get playerBoard() {
        return this._playerBoard;
    }

    get bombBoard() {
        return this._bombBoard;
    }

    flipTile(rowIndex, columnIndex) {

        if (!this.playerBoard[rowIndex][columnIndex] === ' ') {
            console.log('This tile has already been flipped!');
        } else if (this.bombBoard[rowIndex][columnIndex] === 'B') {
            this.playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }

        this._numberOfTiles--;
    }


    getNumberOfNeighborBombs(rowIndex, columnIndex) {
        const neighborOffset = [
            [-1, 0],
            [-1, 1],
            [-1, -1],
            [1, 0],
            [1, -1],
            [0, 1],
            [0, -1],
            [1, 1]
        ];

        let numBombs = 0;

        neighborOffset.forEach(offset => {
            let neighborRowIndex = offset[0] + rowIndex;
        let neighborColumnIndex = offset[1] + columnIndex;

        if (neighborRowIndex >= 0 && neighborRowIndex < this._numberOfRows
            && neighborColumnIndex >= 0 && neighborColumnIndex < this._numberOfColumns) {
            if (this.bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                numBombs++;
            }
        }


    })

        return numBombs;
    }

    hasSafeTiles() {
        return this._numberOfTiles != this._numberOfBombs;
    }


    print() {
        return this.playerBoard.map(row => row.join(' | ')).join('\n');
    }

    printBombBoard() {
        return this.bombBoard.map(row => row.join(' | ')).join('\n');
    }

    static generatePlayerBoard(numRows, numColumns) {
        let emptyBoard = [];

        for(let rowNum = 0; rowNum < numRows; rowNum++) {
            let emptyRow = [];

            for(let colNum = 0; colNum < numColumns; colNum++) {
                emptyRow.push(' ');
            }

            emptyBoard.push(emptyRow);
        }

        return emptyBoard;
    }


    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
        let board = [];
        let numberOfBombsPlaced = 0;

        for (let rowNum = 0; rowNum < numberOfRows; rowNum++) {
            var row = [];
            for (let colNum = 0; colNum < numberOfColumns; colNum++) {
                row.push(null);
            }
            board.push(row);
        }

        let bombRow, bombCol = -1;
        let randomInt = max => Math.floor(Math.random() * Math.floor(max));


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
}