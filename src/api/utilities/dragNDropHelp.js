export function handleDragEnd(event, turnState, setTurnState, setErrMessage, myController){
    console.log(event)
    console.log(myController)
    let coordsStr = event.over.id.slice(-3);
    let coords = coordsStr.split(',').map(idx => Number(idx));
    console.log(coords);
    myController.handleTurn(coords);
    // let copyController = JSON.parse(JSON.stringify(myController.handleTurn(coords)));
    // console.log(copyController)
    console.log(myController)
    setTurnState(turnState + 1)
    // setMyController(JSON.parse(JSON.stringify(myController)));
}