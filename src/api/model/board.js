class Board {

    EMPTY_CELL = '';
    X_MARKER = 'X-marker';
    O_MARKER = 'O-marker'

    constructor(size) {
      /**
       * Initializes board attributes
       *
       * @param {number} size - user input size
       */
      this.size = size;
  
      // // allocate the board with empty squares
      // this.board = Array.from({ length: size }, () =>
      //   Array.from({ length: size }, () => this.EMPTY_CELL)
      // );
      let board = [];

      for(let i = 1; i <= size; i++){
        let row = [];
        for(let j = 1; j <= size; j++){
          let square = {idx: [i - 1, j - 1], value: this.EMPTY_CELL}
          row.push(square);
        }
        board.push(row);
      }

      console.log(board);
      this.board = board;


      // initialize starting positions
      this.mid = Math.floor(Number(size) / 2);
      this.board[this.mid - 1][this.mid].value = 'X';
      this.board[this.mid - 1][this.mid - 1].value = 'O';
      this.board[this.mid][this.mid - 1].value = 'X';
      this.board[this.mid][this.mid].value = 'O';
    }
  
    updateCell(row, column, player) {
      this.board[row][column].value = player;
    }

    //** Sets the .Value of the square
    //  * 
    //  * @param {[] of ints} index -- tuple containing the indexes 
    //  * @param {str} value -- value that we are setting
    //  */
    setItem(index, value){
      let [x, y] = index
      console.log(x, y)
      this.board[x][y].value = value
    }
  
    getItem(index) {
      /**
       * Added board[][] undex syntax
       * @param {Array} index - subscript index as tuple
       * @return {string} value 'X', 'O', or '' at index
       */

      // let [x, y] = index;
      let x = index[0];
      let y = index[1];

      return this.board[x][y].value;
    }
  
    
    isValidLocation(row, col) {
      /**
       * Returns True/False if row, col are within board range
       *
       * @param {number} row - row index of board matrix
       * @param {number} col - column index of board matrix
       * @return {boolean} - true if row and col are within board range, false otherwise
       */
      return row >= 0 && row <= this.size - 1 && col >= 0 && col <= this.size - 1;
    }
  
    countTiles() {
      /**
       * Will count the tiles for each player and return a dict {'X': count , 'O': count}
       *
       * @return {Object} tiles - key = player symbol, value = disks number
       */
      const tiles = {};
      // iterate through matrix
      for (const row of this.board) {
        for (const i of row) {
          if (i.value in tiles) {
            // if already in return dict
            tiles[i.value] += 1; // add to certain
          } else {
            tiles[i.value] = 1;
          }
        }
      }
      console.log(tiles);
      return tiles;
    }
  
    isFull() {
      /**
       * Go through each cell and see if empty.
       *
       * @return {boolean} true if board IS FULL, false if board IS NOT FULL
       */
      for (const row of this.board) {
      
        //check if there is an empty cell in each row
        if (
          row.map(object => object.value).includes(this.EMPTY_CELL) || //if it doesnt include empty cell
          row.map(object => object.value).includes(this.X_MARKER) ||
          row.map(object => object.value).includes(this.O_MARKER) 
          ) {
          return false;
        } else {
          continue;
        }
      }
      return true;
    }
}

export default Board;