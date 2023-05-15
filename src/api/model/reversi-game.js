import _ from "lodash";
import Board from "./board";
import { Players, HumanPlayers, AiPlayers} from "./players";

class ReversiGame {
    static OTHER_PLAYER = 3;
  
    constructor(size, player_1, player_2, choice) {
      this.board_size = size;
      this.board = new Board(size);
      this.player_black = player_1;
      this.player_white = player_2;
      this.currPlayer = "";
      this.choice = choice;
    }
  
    changePlayer() {
      if (this.currPlayer === "") {
        this.currPlayer = this.player_black;
      } else if (this.currPlayer === this.player_black) {
        this.currPlayer = this.player_white;
      } else {
        this.currPlayer = this.player_black;
      }
    }
  
    isValidMove(row, col) {
      const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ];
      const desired_cell = [row, col];
  
      // const boardWithMarkers = this.board.board;
      // console.log(boardWithMarkers)
      // this.removeMarkersFromBoard()
      

      let player_marker, enemy_marker;
      if (this.currPlayer === Players.X) {
        player_marker = "X";
        enemy_marker = "O";
      } else {
        player_marker = "O";
        enemy_marker = "X";
      }
      
      const existing_cell_value = this.board.getItem([row, col]);

      if (existing_cell_value === "X" || existing_cell_value === "O") {
        return false;
      }
  
      for (let direction of directions) {
        let curr_cell = [...desired_cell];
        const to_update = [];
        while (this.board.isValidLocation(curr_cell[0] + direction[0], curr_cell[1] + direction[1])) {
            curr_cell = [curr_cell[0] + direction[0], curr_cell[1] + direction[1]];
            if (this.board.getItem(curr_cell) === enemy_marker || this.board.getItem(curr_cell) === 'O-lastmove'){
              to_update.push(curr_cell);
            } else if (this.board.getItem([curr_cell[0], curr_cell[1]]) === player_marker && to_update.length > 0) {
              return true;
            } else {
              break;
            }
        }
      }
      // this.board = boardWithMarkers;
      return false;
    }

    //**
    //  * 
    //  * @returns [] board as a 1-D ARRAY
    //  */
    getBoardFormatted(){
      let singleArr = [];
     
      for(let x = 0; x < this.board.board.length; x++){
          for(let y = 0; y < this.board.board[0].length; y++){
              if(this.board.getItem([x , y]) === 'X-marker' || this.board.getItem([x , y]) === 'O-marker'){
                this.board.setItem([x, y], '');
              }
              singleArr.push(this.board.board[x][y]);
          }
      }
      return singleArr
  }

    removeMarkersFromBoard(){
      for(let x = 0; x < this.board.board.length; x++){
        for(let y = 0; y < this.board.board[0].length; y++){
            if(this.board.getItem([x , y]) === 'X-marker' || this.board.getItem([x , y]) === 'O-marker'){
              this.board.setItem([x, y], '');
            }else if(this.board.getItem([x , y]) === 'O-lastmove'){
              this.board.setItem([x , y], 'O');
            }
        }
    }
    }

    markAiMove(row, col){
      const index = [row, col];
      this.board.setItem(index, 'O-lastmove')
    }

    insertPlayerCurrentMoves(){
      let validMoves = this.getValidMoves();
      console.log(validMoves);
      console.log('from insertPlayerCurrentMoves')
      
      let value;
      if(this.currPlayer === 1){
        value = 'X-marker'
      }else if(this.currPlayer === 2){
        value = 'O-marker'
      }

      //set the markers in the places where curr player can move
      for(const move of validMoves){
        this.board.setItem(move, value);
      }


      if(validMoves.length === 0){
        console.log('no valid moves');
        return false;
      }else{
        return true;
      }

      
    }
  
    exist_valid_moves() {
      const currPlayer = this.currPlayer;
  
      for (let i = 0; i < this.board.board[0].length; i++) {
        for (let j = 0; j < this.board.board.length; j++) {
          if (this.board.board[i][j] === "") {
            if (this.isValidMove(i, j)) {
              if (this.currPlayer !== currPlayer) {
                this.changePlayer();
              }
              return true;
            } else {
              continue;
            }
          }
        }
      }
      return false;
    }
  
    getValidMoves() {
      const moves_lst = [];
      
      let marker;
      if(this.currPlayer === 1){
        marker = 'X-marker'
      }else{
        marker = 'O-marker'
      }

      for (let i = 0; i < this.board.board[0].length; i++) {
        for (let j = 0; j < this.board.board.length; j++) {
          if (this.board.board[i][j].value === "" || this.board.board[i][j].value === marker) {
            if (this.isValidMove(i, j)) {
              moves_lst.push([i, j]);
            } else {
              continue;
            }
          }
        }
      }
      return moves_lst;
    }

    minimax(depth = 3, isStartPlayer = true) {
        if (depth === 0 || this.isTerminated()) {
            this.currPlayer = this.player_white;
            return this.getScoreOfCurrentBoard();
        }

        console.log(`depth ${depth}`)

        const copyGame = _.cloneDeep(this);

        if (isStartPlayer) {
            let maximumScoreOfSubtrees = -Infinity;
            copyGame.currPlayer = copyGame.player_white;
            const validMoves = copyGame.getValidMoves();
            console.log('valid moves output')
            console.log(validMoves)

            for (const move of validMoves) { 
                copyGame.makeMove(move[0], move[1]);
                const childScore = copyGame.minimax(depth - 1, false);
 
                if (childScore > maximumScoreOfSubtrees) {
                    // bestMove = move;
                } else if (childScore === maximumScoreOfSubtrees) {
                    const randomNum = Math.round(Math.random());
                    if (randomNum === 1) {
                        // bestMove = move;
                    }
                }

                console.log(copyGame);
                copyGame.board = this.board.board.map(row => [...row]);
                copyGame.currPlayer = copyGame.player_white;
                maximumScoreOfSubtrees = Math.max(maximumScoreOfSubtrees, childScore);
            }

            // if (depth === this.maxDepth) {
            //     return bestMove;
            // }

            return maximumScoreOfSubtrees;

        } else {
            let minimumScoreOfSubtrees = Infinity;
            copyGame.currPlayer = copyGame.playerX;
            const validMoves = copyGame.getValidMoves();

            for (const move of validMoves) {
                copyGame.makeMove(move[0], move[1]);
                const childScore = copyGame.minimax(depth - 1, true);

                if (childScore < minimumScoreOfSubtrees) {
                    // bestMove = move;
                } else if (childScore === minimumScoreOfSubtrees) {
                    const randomNum = Math.round(Math.random());
                    // if (randomNum === 1) {
                    //     bestMove = move;
                    // }
                }

                copyGame.board = this.board.map(row => [...row]);
                copyGame.currPlayer = copyGame.playerX;
                minimumScoreOfSubtrees = Math.min(minimumScoreOfSubtrees, childScore);
            }

            // if (depth === this.maxDepth) {
            //     return bestMove;
            // }

            return minimumScoreOfSubtrees;
        }
    }

    getSimpleAIMove() {
        const validMoves = this.getValidMoves();
        const moveAndScore = [];

        for (const move of validMoves) {
            const score = this.getScore(move);
            moveAndScore.push([move, score]);
        }

        const scoreList = moveAndScore.map(pair => pair[1]);
        const maxScore = Math.max(...scoreList);
        console.log('moveAndScore output:')
        console.log(moveAndScore);
        const bestMoves = moveAndScore.filter(pair => pair[1] === maxScore).map(pair => pair[0]);
        const randomIndex = Math.floor(Math.random() * bestMoves.length);


        return bestMoves[randomIndex];
    }

    getScoreOfCurrentBoard() {
      // This function will return the score of the CURRENT board without making changes or a move
    
      // Current player should be the AI
      let enemy_marker, player_marker;
      if (this.currPlayer === this.player_white) {
        enemy_marker = 'X';
        player_marker = 'O';
      } else if (this.currPlayer === this.player_black) {
        enemy_marker = 'O';
        player_marker = 'X';
      }
    
      const tiles = this.board.countTiles();
      let enemy_score = tiles[enemy_marker];
      let player_score = tiles[player_marker];

      if(enemy_score === undefined){ enemy_score = 0; }
      if(player_score === undefined){ player_score = 0; }
    
      return player_score - enemy_score;
    }

    


    // get_scosre will return the score for a given move
    // Args:
    //    move: [row, col] representing the move that we are checking the score for
    // Ret: 
    //    score: representing the score of the move we checked (Ai score after - opponent score after)
    getScore(move) {
        
        let player_marker, enemy_marker;
        
        console.log(this.currPlayer);
        if (this.currPlayer === this.player_white) {
          enemy_marker = 'X';
          player_marker = 'O';
        } else if (this.currPlayer === this.player_black) {
          enemy_marker = 'O';
          player_marker = 'X';
        }
    
        //make a copy of the board
        // const copy_of_game = JSON.parse(JSON.stringify(this));
        
        console.log('ai move:');
        console.log(move);
        const copy_of_game = _.cloneDeep(this)
        console.log(this)
        console.log(copy_of_game)

        // const copyOfBoard = JSON.parse(JSON.stringify(this.board))

        //make the move in the copied game
        // this.makeMove(move[0], move[1]);
        copy_of_game.makeMove(move[0], move[1]);
    
        //count it up after move is made
        const num_disks = copy_of_game.board.countTiles();

        let enemy_score = num_disks[enemy_marker];
        let player_score = num_disks[player_marker];

        if(enemy_score === undefined){ enemy_score = 0; }
        if(player_score === undefined){ player_score = 0; }

        // this.board = copyOfBoard;
        return player_score - enemy_score;
    }
    
    // exist_any_valid_moves will return True if EITHER player has a valid move the current player; 
    // return False is NO MOVES EXIST
    // Args:
    //    player: 'X' or 'O'
    existAnyValidMoves() {
        //keep current player when function starts
        const currPlayer = this.currPlayer;
        
        //iter across empty spaces, twice, check if either player has valid move
        for (let player_num = 0; player_num < 2; player_num++) {
          if (player_num === 1) {
              this.changePlayer(); //change the current player to check for the other player
          }

          let playerMarker = player_num === 0 ? 'X-marker' : 'O-marker';
          let enemyMarker = player_num === 0 ? 'O -marker' : 'X-marker';

          for (let i = 0; i < this.board.board[0].length; i++) {
              for (let j = 0; j < this.board.board.length; j++) {
                 //if space is empty, check  and see if valid move for either player
              if (this.board.board[i][j].value === '' || this.board.board[i][j].value === playerMarker || this.board.board[i][j].value === enemyMarker) {
                  if (this.isValidMove(i, j)) { //if move is valid
                    if (this.currPlayer !== currPlayer) {
                        this.changePlayer();
                    }
                    return true; //we know that A valid move exists
                  } else {
                    continue;
                  }
              }
            }
        }
        }
    
        //check make sure player is same as start
        if (this.currPlayer !== currPlayer) {
          this.changePlayer();
        }
        return false;
    }

    getCurrentPlayerStr(){
      if(this.currPlayer === 1){
        return 'Black'
      }else if(this.currPlayer === 2){
        return 'White'
      }
    }


    // function to make a move on the board
    makeMove(row, col) {
        const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
        ]; // direction list to iterate over
        const targetCell = [row, col]; // tup of cell we want to move to

        // set markers depending on who is making the move
        let enemyMarker, playerMarker;
        console.log(`this.currPlayer: ${this.currPlayer}`)
        if (this.currPlayer === 1) {
            enemyMarker = 'O';
            playerMarker = 'X';
        } else {
            enemyMarker = 'X';
            playerMarker = 'O';
        }

        console.log(targetCell)
        for (const direction of directions) {
        let currCell = [...targetCell];
        const toUpdate = []; // to update will store a list of the cells that need to be updated
        while (this.board.isValidLocation(currCell[0] + direction[0], currCell[1] + direction[1])) {
            currCell = [
            currCell[0] + direction[0],
            currCell[1] + direction[1]
            ];
            if (this.board.getItem([currCell[0], currCell[1]]) === enemyMarker) {
            toUpdate.push([...currCell]);
            } else if (this.board.getItem([currCell[0], currCell[1]]) === playerMarker && toUpdate.length > 0) {
            // for each cell that needs to be updated
            for (const cellToUpdate of toUpdate) {
                this.board.updateCell(cellToUpdate[0], cellToUpdate[1], playerMarker); // update it with marker from current player!
            }
            } else {
            break;
            }
        }
        }
        this.board.updateCell(row, col, playerMarker);
        console.log(this.board.board);
    }

    // function to check if the game is terminated
    isTerminated() {

        console.log('isFull executing')
        console.log(this.board.isFull())
        console.log('existAnyValidMoves executing');
        console.log(this.existAnyValidMoves());

        // if the board is full or no valid moves exist, then the game is over
        if (this.board.isFull() || !this.existAnyValidMoves()) {
          return true;
        } else {
        // else continue the game
          return false;
        }
    }

}

export default ReversiGame