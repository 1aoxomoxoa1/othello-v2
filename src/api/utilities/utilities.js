export const modeMap = new Map([
    ['player-vs-player' , 1],
    ['player-vs-simple-ai' , 2],
    ['player-vs-complex-ai' , 3],
])

export function squareClicked(event, turnState, setTurnState, setErrMessageClass, setErrMessage, myController){
    console.log(event)
    console.log(myController)
    let coordsStr = event.target.className.slice(-3);
    let coords = coordsStr.split(',').map(idx => Number(idx));
    console.log(coords);
    myController.handleTurn(coords, setErrMessageClass, setErrMessage);
    // let copyController = JSON.parse(JSON.stringify(myController.handleTurn(coords)));
    // console.log(copyController)
    console.log(myController)
    setTurnState(turnState + 1)
}

//** handles when play again button is pressed
//  * 
//  * 
//  */
export function handlePlayAgain(){
    window.location.reload();
}

export function handleBackToMenu(navigate){
    navigate('/')
}
