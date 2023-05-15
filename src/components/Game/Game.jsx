import '../../css/game/game.css'
import ReversiGame from '../../api/model/reversi-game'
import { useEffect, useState } from 'react'
import GameController from '../../api/controller/gamecontroller'
import GameRow from './GameRow'
import Square from './Square'
import { HumanPlayers } from '../../api/model/players'
import GameOver from './GameOver'

function Game(){

    //for keeping the states of the game
    const [myController, setMyController] = useState(undefined);
    const [game, setGame] = useState(undefined);
    const [board, setBoard] = useState(undefined);
    const [turnState, setTurnState] = useState(1)
    const [n, setN] = useState(undefined);
    const [gameOverState, setGameOverState] = useState(false);

    //for displaying messages
    const [errMessageClass, setErrMessageClass] = useState('error-msg hide');
    const [errMessage, setErrMessage] = useState('');
    const [score, setScore] = useState({});

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const n = Number(params.get('n'));
        const modeInteger = Number(params.get('mode'));

        let myGameController = new GameController(n, modeInteger)
        console.log(myGameController);

        setN(n);
        let myReversiGame = myGameController.startGame(setGame);
        
        setMyController(myGameController);
        
        setTurnState(turnState + 1)

    }, []);

    //each time myController changes, we will want to get the board formatted and set state of myBoard
    useEffect(() => {

        if(myController !== undefined){
            let gameOver = false; 

            console.log(myController);
            let myBoard = myController.model.getBoardFormatted();
            console.log('in useeffect from mtController')
            let areValidMoves = myController.model.insertPlayerCurrentMoves();

            //this is case when a player gets skipped
            if(!areValidMoves){
                console.log('players change in useEffect , player skipped')
                setErrMessageClass('error-msg show')
                setErrMessage(`${myController.model.currPlayer === 1 ? 'Black' : 'White'} Skipped`);
                myController.model.changePlayer();

               
                //we also want to check end-game condition here
                if(!myController.model.existAnyValidMoves()){
                    console.log('GAME OVER CABRON');
                    setErrMessageClass('error-msg hide');
                    setErrMessage('');
                    gameOver = true
                    setGameOverState(true);
                }

                if(!gameOver && ( myController.model.choice === 2 || myController.model.choice === 3) ){
                    console.log('handling ai turn')
                    myController.handleAiTurn();
                }

                //this will force UE to re-call
                if(!gameOver){
                    setTurnState(turnState + 1)
                }
            }

            const tiles = myController.model.board.countTiles();
            setScore(tiles)
            setBoard(myBoard);
            console.log(myController.model.currPlayer)
        }else{
            console.log('controller is und')
        }
    }, [turnState])


    console.log(game)
    console.log(board)

    return(
        <main>
            { gameOverState === false
              ?  <div className='game-ui'>
                    <div className='user-interface'> 
                        <div className='game-ctr'> 
                            <div 
                            style={{
                                gridTemplateColumns: `repeat(${n}, 50px)`,
                                gridTemplateRows: `repeat(${n}, 50px)`,
                                margin: '20px auto',
                                display: 'grid'
                            }}>
                                { board !== undefined
                                ? board.map(square => 
                                    <Square 
                                        square={square}
                                        turnState={turnState}
                                        setTurnState={setTurnState}
                                        setErrMessageClass={setErrMessageClass}
                                        setErrMessage={setErrMessage}
                                        myController={myController}
                                    > 
                                    </Square>
                                ) 
                                :<div style={{height: '200px', backgroundColor:'red'}}> </div>
                                }
                            </div>
                        </div>
                        { board !== undefined
                        ?<div className='game-messages'> 
                            <h3 className='turn-indicator'> Turn: {game.getCurrentPlayerStr()} </h3>
                            <h5> Black: {score['X'] === undefined ? '0' : score['X']} White: {score['O'] === undefined ? '0' : score['O']} </h5>
                            <h5> To make move, click square showing available move. </h5>
                            <h5 className={errMessageClass}> {errMessage} </h5>

                            </div>
                        : <> </>
                        }
                    </div>
                </div>
            :<div className='end-game-ui'> 
                <GameOver score={score}> </GameOver>
            </div>
            }
        </main>
    )
}

export default Game