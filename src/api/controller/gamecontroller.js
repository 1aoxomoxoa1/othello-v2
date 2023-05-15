import { Players, HumanPlayers, AiPlayers } from "../model/players";
import ReversiGame from "../model/reversi-game";

class GameController{
    
    //**
    //  * 
    //  * @param {int} size -- nxn size of board
    //  * @param {int} modeChoice -- 1, 2 indicating choice of game style
    //  */
    constructor(size, modeChoice){ 
        console.log(size);
        if(modeChoice === 1){
            this.model = new ReversiGame(size, HumanPlayers.X, HumanPlayers.O, modeChoice)
        }else if(modeChoice === 2){
            this.model = new ReversiGame(size, HumanPlayers.X, AiPlayers.O, modeChoice)
        }
    }

    startGame(setGame){
        this.model.changePlayer();
        setGame(this.model);
        return this.model;
    }

    //** This function is called every drag end, the coordinates of the drag end location are passed in
    //  * 
    //  * @param {[int, int]} coords -- List [ints] storing the coordinates for the user's desired move
    //  * @param {fn} setErrMessagClass -- fn to change state of error message if there is an error
    //  */
    handleTurn(coords, setErrMessageClass, setErrMessage){
        // if(!this.model.isTerminated()){
            
        
            console.log(`MODEL NOT TERMINATED, HADLING player ${this.model.currPlayer} ${coords[0]}, ${coords[1]}`);

            console.log(this.model);
            this.model.removeMarkersFromBoard();
            let userMoves = this.model.getValidMoves();
            console.log(`'USER MOVES FOR ${this.model.currPlayer}`);
            console.log(userMoves);

            if(userMoves.length === 0){
                console.log('no moves from handleTurn');
                setErrMessage('No moves!');
                setErrMessageClass('error-msg show');
            }

            //if it is a valid move
            if(userMoves.map(arr => JSON.stringify(arr)).includes(JSON.stringify(coords))){
                this.model.makeMove(coords[0], coords[1]);
                this.model.getBoardFormatted();
                console.log('player changing')
                this.model.changePlayer();
                setErrMessageClass('error-msg hide');
                setErrMessage('');


                //handle the ai turn if we need to, if not playing against AI does nothing
                this.handleAiTurn();
                
                console.log('valid move')
            }else{ //if not valid move
                console.log('setting error message to Invalid Move')
                setErrMessageClass('error-msg show');
                setErrMessage('Invalid Move')
            }
            console.log('model not terminated');
       
            // }else{
            // //in the case that the game is terminated
            // console.log('game terminated')
            // }

        return this;
    
    }

    handleAiTurn(){
        let aiMove;
        console.log(this.model.choice)
        if(this.model.choice === 2){ //normal AI model
            aiMove = this.model.getSimpleAIMove();
            console.log('random ai move selected:')
            console.log(aiMove)
            this.model.makeMove(aiMove[0], aiMove[1]);
            this.model.markAiMove(aiMove[0], aiMove[1]);
            this.model.changePlayer();
        }else{ //if player vs player we do nothing for ai turn
            return
        }
    }
}

export default GameController